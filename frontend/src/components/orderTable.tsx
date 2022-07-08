import {observer} from "mobx-react-lite";
import * as React from "react";
import {useContext} from "react";
import {OrderLine} from "./orderLine.tsx";
import {OrderStoreContext} from "./orderView.tsx";

export const OrderTable = observer(() => {
    const orderStore = useContext(OrderStoreContext)

    return (<table className="table table-hover">
        <thead>
        <tr>
            <th>ID</th>
            <th>Services</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Execution Date</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
            orderStore?.orders?.length ? orderStore.orders.map(o => <OrderLine key={o.uuid} order={o}/>)
                : <tr>
                    <td colSpan={7}> There are currently no orders</td>
                </tr>
        }
        </tbody>
    </table>)
})