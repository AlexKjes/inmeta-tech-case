import * as React from "react";
import {observer} from "mobx-react-lite"
import {OrderStore} from "../stores/OrderStore.ts";
import {CreateOrder} from "./createOrder.tsx";
import {OrderTable} from "./orderTable.tsx";


export const OrderStoreContext = React.createContext<OrderStore | null>({})

export const OrderView = observer((props) => {
    return (<div style={{margin: "1em"}}>
        <h2 style={{display: "inline"}}>Orders</h2>
        <OrderStoreContext.Provider value={new OrderStore()}>
            <CreateOrder/>
            <OrderTable/>
        </OrderStoreContext.Provider>
    </div>)
});
