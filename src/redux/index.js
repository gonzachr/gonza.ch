import currentView from "./reducers";
import { createStore } from "redux";

const store = createStore(
  currentView,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
