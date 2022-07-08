import Order, {OrderInterface} from "../models/order.ts";
import {makeAutoObservable, runInAction} from "mobx";
import Customer, {CustomerInterface} from "../models/customer.ts";

export class OrderStore {

    private isLoading: boolean = false;
    private _orders: Order[];
    get orders() {
        this.fetchOrders()
        return this._orders
    }

    deleteOrder(order: Order) {
        order.delete();
        this._orders = [];
        this.fetchOrders(true);
    }

    saveOrder(order: OrderInterface): Promise<void> {
        return this.saveCustomer(order.customer)
            .then(customer => {
                console.log(customer);
                order.customer = customer.customerHAL._links.self.href
                return fetch(process.env.REACT_APP_API_PATH + "order", {
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: {
                        "Content-Type": "application/hal+json"
                    }
                })
            }).then(() => {
                this.fetchOrders(true);
                Promise.resolve();
            })
    }

    private saveCustomer(customer: CustomerInterface): Promise<Customer> {
        return fetch(process.env.REACT_APP_API_PATH + "customer", {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(customerHAL => new Customer(customerHAL));
    }

    constructor() {
        makeAutoObservable(this);
    }

    private fetchOrders(force: boolean = false) {
        if ((!this._orders && !this.isLoading) || force) {
            runInAction(() => this.isLoading = true)
            fetch(process.env.REACT_APP_API_PATH + "order")
                .then(response => response.json())
                .then(orders => runInAction(() => this._orders = orders._embedded.order.map(orderHAL => new Order(orderHAL))))
                .then(() => runInAction(() => this.isLoading = false))
        }
    }


}

