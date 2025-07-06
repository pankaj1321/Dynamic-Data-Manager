import { configureStore } from "@reduxjs/toolkit";
import Tablereducer from "./TableSlice";


const store = configureStore({
    reducer: {
        table: Tablereducer
    }
})


export default store;