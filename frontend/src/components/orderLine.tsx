import {observer} from "mobx-react-lite";
import Order from "../models/order.ts";
import * as React from "react";
import {Fragment, useContext, useState} from "react";
import {OrderStoreContext} from "./orderView.tsx";
import {EditForm} from "./editForm.tsx";

export const OrderLine = observer((props: { order: Order }) => {
    const order = props.order;
    const [expand, setExpand] = useState(false)
    const orderStore = useContext(OrderStoreContext)

    return order.customer ? (<Fragment>
        <tr onClick={() => setExpand(!expand)}>
            <td>{order.uuid}</td>
            <td>{order.serviceTypes.reduce((agg, type, idx) => agg + (idx != 0 ? ", " : "") + type, "")}</td>
            <td>{order.customer.name}</td>
            <td>{order.customer.phoneNumber}</td>
            <td>{order.customer.emailAddress}</td>
            <td>{order.executionDate.toISOString()}</td>
            <td>
                <button type="button" className="btn btn-danger"
                        onClick={(event) => {
                            event.preventDefault();
                            orderStore.deleteOrder(order);
                        }}>X
                </button>
            </td>
        </tr>
        {expand ? <EditForm order={order}/> : <Fragment/>}

    </Fragment>) : (<Fragment/>)
})