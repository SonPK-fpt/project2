import reducers from './reducers';
import middleware from "./middlewares";
import { legacy_createStore as createStore } from "redux";

const store = createStore(reducers, middleware);

export default store;
