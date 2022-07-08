import Address from "./address.ts";
import Customer from "./customer.ts";
import {ServiceType} from "./serviceType.ts";
import {makeAutoObservable} from "mobx";

export interface OrderHAL {
    uuid: string,
    fromAddress: Address,
    toAddress: Address,
    serviceTypes: string[],
    executionDate: string,
    note: string,
    _links: { self: { href: string }, customer: { href: string } }
}

export interface OrderInterface {
    fromAddress: Address,
    toAddress: Address,
    serviceTypes: string[],
    executionDate: string,
    customer: Customer,
    note: string,
}

interface OrderDto extends OrderInterface {
    readonly _links: { self: { href: string }, customer: { href: string } }
}

export default class Order implements OrderInterface {

    private halObject: OrderHAL;

    private _fromAddress: Address;
    get fromAddress() {
        return this._fromAddress;
    }

    set fromAddress(address: Address) {
        this._fromAddress = address;
    }

    private _uuid: string;
    get uuid() {
        return this._uuid
    }

    private _toAddress: Address;
    get toAddress() {
        return this._toAddress;
    }

    set toAddress(address: Address) {
        this._toAddress = address;
    }

    private _customer: Customer;
    get customer() {
        if (!this._customer) {
            fetch(this.halObject._links.customer.href)
                .then(response => response.json())
                .then(customer => this.customer = new Customer(customer))
        }
        return this._customer;
    }

    set customer(customer: Customer) {
        this._customer = customer;
    }

    private _note: string;
    get note() {
        return this._note
    }

    set note(note: string) {
        this._note = note;
    }

    private _executionDate: Date;
    get executionDate() {
        return this._executionDate;
    }

    set executionDate(executionDate: Date) {
        this._executionDate = executionDate;
    }

    private _serviceTypes: ServiceType[] = [];
    get serviceTypes() {
        return this._serviceTypes;
    }

    addServiceTypes(serviceType: ServiceType) {
        this._serviceTypes.push(serviceType);
    }

    removeServiceType(serviceType: ServiceType) {
        console.log(this._serviceTypes)
        this._serviceTypes = this._serviceTypes.filter(st => st != serviceType)
    }

    constructor(halObject: OrderHAL) {
        makeAutoObservable(this);
        this.halObject = halObject
        this._uuid = halObject.uuid;
        this.fromAddress = halObject.fromAddress;
        this.toAddress = halObject.toAddress;
        this.executionDate = new Date(halObject.executionDate);
        halObject.serviceTypes.forEach(type => {
            this.addServiceTypes(type)
        })
        this.note = halObject.note;
    }

    delete() {
        fetch(this.halObject._links.self.href, {method: "DELETE"})
            .then(() => this.customer.delete());
    }

    update(): Promise<void> {
        const dto = {
            uuid: this.uuid,
            note: this._note,
            toAddress: this.toAddress,
            fromAddress: this.fromAddress,
            executionDate: this._executionDate.toISOString(),
            serviceTypes: this._serviceTypes,
            customer: "/"+this.customer.uuid
        };
        return fetch(this.halObject._links.self.href,
            {
                method: "PATCH",
                body: JSON.stringify(dto),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(() =>  Promise.resolve());
    }

}