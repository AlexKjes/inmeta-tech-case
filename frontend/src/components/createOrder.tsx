import {observer} from "mobx-react-lite";
import * as React from "react";
import {Fragment, useContext, useState} from "react";
import {observable} from "mobx";
import {ServiceType} from "../models/serviceType.ts";
import Address from "../models/address.ts";
import {OrderInterface} from "../models/order.ts";
import {CustomerInterface} from "../models/customer.ts";
import {OrderStoreContext} from "./orderView.tsx";
import {OrderForm} from "./orderForm.tsx";

function orderFactory() {
    return {
        executionDate: new Date(),
        note: "sadfsdfgsdfg",
        serviceTypes: [ServiceType.PACKING],
        fromAddress: {street: "sdfgsdfg", region: "sdfgsdfg", postalCode: "sdfgsdfg"} as Address,
        toAddress: {street: "sdfgsdfgsd", region: "sdfgsdfgsd", postalCode: "sdfgsdfg"} as Address,
        customer: customerFactory()
    } as OrderInterface
}

function customerFactory() {
    return {
        name: "sdfgsdfg",
        emailAddress: "sdfgsdfg",
        phoneNumber: "sdfgsdfg",
    } as CustomerInterface
}

export const CreateOrder = observer(({}) => {
    const [toggle, setToggle] = useState(false);
    const orderStore = useContext(OrderStoreContext);
    const [order, setOrder] = useState(observable(orderFactory()));

    const reset = () => {
        setToggle(!toggle);
        setOrder(observable(orderFactory()));
    }

    return (<Fragment>
            <div style={{float: "right", display: "inline-block"}}>
                <button type="button" className="btn btn-primary"
                        onClick={() => setToggle(!toggle)}>Create new order
                </button>
            </div>
            {toggle ?
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,.3)"
                }}>
                    <div className="modal-content" style={{margin: "auto", width: "50%", marginTop: "1em"}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Creeate new order</h5>
                            <button type="button" className="btn btn-danger"
                                    onClick={reset}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <OrderForm order={order} customer={order.customer}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={reset}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                reset();
                                orderStore.saveOrder(order)
                            }}>Save changes
                            </button>
                        </div>
                    </div>
                </div>
                : <Fragment/>}
        </Fragment>
    )
})
