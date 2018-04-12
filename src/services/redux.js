import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { connect } from "react-redux";
import { reducer } from "./reducer";

const logger = createLogger();
export const store = createStore(reducer, applyMiddleware(logger));
export const getState = () => store.getState();
export const dispatch = store.dispatch;

const mapStateToProps = s => s;
const mapDispatchToProps = dispatch => ({
  changeLoginField: (key, value) => {
    dispatch({ type: "change-login-field", payload: { key, value } });
  }
});
export const simpleConnectMyComponent = Component =>
  connect(mapStateToProps)(Component);
export const connectMyComponent = Component =>
  connect(mapStateToProps, mapDispatchToProps)(Component);
