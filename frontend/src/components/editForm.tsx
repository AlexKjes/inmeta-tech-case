import {observer} from "mobx-react-lite";
import Order from "../models/order.ts";
import * as React from "react";
import {OrderForm} from "./orderForm.tsx";

export const EditForm = observer((props: { order: Order }) => {
    const order = props.order;
    const customer = order.customer;

    return (
        <tr>
            <td colSpan={7}>
                <div style={{maxWidth: "40%"}}>
                    <OrderForm order={order} customer={customer}/>
                    <button type="button" className="btn btn-primary active"
                            onClick={() => {
                                order.update();
                                customer.update()
                            }}>Update
                    </button>
                </div>
            </td>
        </tr>)
});