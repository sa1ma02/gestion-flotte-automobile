import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerVehiculeReducer from "./Customers/Vehicule/Reducer";
import vehiculeReducer from "./Admin/Vehicule/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import adminOrderReducer from "./Admin/Orders/Reducer";






const rootReducers=combineReducers({

    auth:authReducer,
    customersVehicule:customerVehiculeReducer,
    order:orderReducer,
    adminsVehicule:vehiculeReducer,
    adminsOrder:adminOrderReducer,


});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))