import {observer} from "mobx-react-lite";
import {OrderInterface} from "../models/order.ts";
import {CustomerInterface} from "../models/customer.ts";
import * as React from "react";
import {Fragment} from "react";
import {ServiceType} from "../models/serviceType.ts";

export const OrderForm = observer((props: { order: OrderInterface, customer: CustomerInterface }) => {
    const order = props.order;
    const customer = props.customer;

    const removeFromList = (list: any[], item: any) => {
        const idx = list.indexOf(item);
        if (idx != -1) {list.splice(idx, 1)}
    }

    return <Fragment>
        <div style={{
            borderLeft: "2px darkgray solid",
            marginLeft: "1em",
            paddingLeft: "2em",
            marginBottom: "1em"
        }}>
            <div className="form-group">
                <label htmlFor="customerName">Customer name</label>
                <input type="text" className="form-control" id="customerName"
                       placeholder="Enter customer name" value={customer.name}
                       onChange={event => customer.name = event.target.value}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email"
                       placeholder="Enter customer email" value={customer.emailAddress}
                       onChange={event => customer.emailAddress = event.target.value}/>
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <input type="tel" className="form-control" id="phoneNumber"
                       placeholder="Enter customer phone number"
                       value={customer.phoneNumber}
                       onChange={event => customer.phoneNumber = event.target.value}/>
            </div>
            <div className="form-group">
                <label htmlFor="toAddress">To address</label>
                <div className="input-group">
                    <input type="text" className="form-control"
                           placeholder="Enter street" value={order.toAddress.street}
                           onChange={event => order.toAddress.street = event.target.value}/>
                    <input type="text" className="form-control"
                           placeholder="Enter postal code" value={order.toAddress.postalCode}
                           onChange={event => order.toAddress.postalCode = event.target.value}/>
                    <input type="text" className="form-control"
                           placeholder="Enter region" value={order.toAddress.region}
                           onChange={event => order.toAddress.region = event.target.value}/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fromAddress">From address</label>
                <div className="input-group" id="fromAddress">
                    <input type="text" className="form-control"
                           placeholder="Enter street" value={order.fromAddress.street}
                           onChange={event => order.fromAddress.street = event.target.value}/>
                    <input type="text" className="form-control"
                           placeholder="Enter postal code" value={order.fromAddress.postalCode}
                           onChange={event => order.fromAddress.postalCode = event.target.value}/>
                    <input type="text" className="form-control"
                           placeholder="Enter region" value={order.fromAddress.region}
                           onChange={event => order.fromAddress.region = event.target.value}/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="executionTime">Execution Time</label>
                <input type="datetime-local" className="form-control" id="executionTime"
                       placeholder="Enter customer name"
                       value={new Date(order.executionDate).toISOString().split(".")[0]}
                       onChange={event => order.executionDate = new Date(event.target.value)}/>
            </div>
            <div className="btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                    <input type="checkbox" defaultChecked={order.serviceTypes.includes(ServiceType.PACKING)}
                           onClick={event => event.currentTarget.checked ? order.addServiceTypes(ServiceType.PACKING) :
                               removeFromList(order.serviceTypes, ServiceType.PACKING)}/> {ServiceType.PACKING}
                </label>
                <label className="btn btn-secondary active">
                    <input type="checkbox" defaultChecked={order.serviceTypes.includes(ServiceType.CLEANING)}
                           onClick={event => event.currentTarget.checked ? order.addServiceTypes(ServiceType.CLEANING) :
                               removeFromList(order.serviceTypes, ServiceType.CLEANING)}/> {ServiceType.CLEANING}
                </label>
                <label className="btn btn-secondary active">
                    <input type="checkbox" defaultChecked={order.serviceTypes.includes(ServiceType.MOVING)}
                           onClick={event => event.currentTarget.checked ? order.serviceTypes.push(ServiceType.MOVING) :
                               removeFromList(order.serviceTypes, ServiceType.MOVING)}/> {ServiceType.MOVING}

                </label>
            </div>
            <div className="form-group">
                <label htmlFor="executionTime">Note</label>
                <input type="text" className="form-control" id="executionTime"
                       placeholder="Enter notes" value={order.note}
                       onChange={event => order.note = event.target.value}/>
            </div>
        </div>
    </Fragment>
})
