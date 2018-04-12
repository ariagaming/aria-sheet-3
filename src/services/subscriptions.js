import React from "react";
import { dispatch, getState } from "./redux";
import { loginWithEmailAndPassword, logout, getUserFromDatabase } from "./api";

/**
 * Connect your component to the subscription library.
 * @param {*} mapSubsToProps
 */
export const connectSub = mapSubsToProps => Component => props => {
  const newMapSubsToProps = Object.keys(mapSubsToProps).reduce((acc, key) => {
    // the arity which we can use
    const arity = mapSubsToProps[key].length;
    const messageType = mapSubsToProps[key].messageType || key;

    acc[key] = (...args) => () => {
      // create the functionArguments
      const functionArguments = [...args, dispatch, key, getState(), arity];

      dispatch({ type: `${messageType}-start` });
      return mapSubsToProps[key]
        .apply(null, functionArguments)
        .then(r => dispatch({ type: `${messageType}-success`, payload: r }))
        .catch(error => {
          console.error(error);
          dispatch({ type: `${messageType}-error`, payload: error });
        });
    };
    return acc;
  }, {});
  return <Component {...props} {...newMapSubsToProps} />;
};
const mapSubscriptionsToProps = {
  firebaseLogin: loginWithEmailAndPassword,
  firebaseLogout: logout,
  getUserFromDatabase: getUserFromDatabase
};

export const connectMySubscriptionComponent = Component =>
  connectSub(mapSubscriptionsToProps)(Component);
