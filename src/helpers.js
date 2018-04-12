/*eslint no-extend-native: ["error", { "exceptions": ["Promise", "Object"] }]*/
import React from "react";
import { dispatch } from "./services/redux";

/**
 * A way to chain promises
 * @param {Promise} nextPromise - The next Promise which will be called.
 * @param {Function?} intercede - A pass-through function which can either transform the data or log it.
 */
Promise.prototype.andThen = function(nextPromise, intercede) {
  const self = this;
  return new Promise((resolve, reject) => {
    self
      .then(r => {
        nextPromise(r)
          .then(r => {
            if (intercede) {
              resolve(intercede(r));
            } else {
              resolve(r);
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

/**
 * Transform the data coming from a Promise. You can transform a Promise
 * usually used to pass it into another `andThen`
 * @param {Function?} transformer
 */
Promise.prototype.transform = function(transformer) {
  const self = this;
  return new Promise((resolve, reject) => {
    self
      .then(r => {
        if (transformer) {
          resolve(transformer(r));
        } else {
          resolve(r);
        }
      })
      .catch(reject);
  });
};

/**
 * Assure that some `props` based predicate is folfilled before rendering a Component.
 * @param {Predicate : props -> Bool} t
 * @param {Component} Component
 */
export const assure = (t, Component, Alternative) => props => {
  //const Failed = <div>This component appears to not pass the assurance that the properties are intact.</div>;
  return !!t(props) ? (
    <Component {...props} />
  ) : Alternative ? (
    <Alternative />
  ) : null;
};

let runningActions = [];
/**
 * Ensure that a predicate is true and if not call a subscription.
 * @param {*} config
 * @param {*} Component
 */
export const ensure = (config, Component) => props => {
  const c = Array.isArray(config) ? config : [config];
  const result = c.reduce((acc, t) => {
    const { test, action, actionType, params = [] } = t;
    const valid = test ? test(props) : true;
    if (!valid && action) {
      if (action && actionType && runningActions.indexOf(actionType) === -1) {
        runningActions.push(actionType);
        dispatch({
          type: `${actionType}-start`
        });
        action.apply(null, params).then(r => {
          dispatch({
            type: `${actionType}-success`,
            payload: r
          });
          runningActions.splice(runningActions.indexOf(actionType), 1);
        });
      }
    }
    return acc && valid;
  }, true);
  //console.log(`ensure: Component ${Component.name} is ${result ? "valid" : "invalid"}`);
  return result ? <Component {...props} /> : null;
};

export const populate = (config, Component) => props => {
  const extraProps = config(props);
  return <Component {...props} {...extraProps} />;
};

/* eslint-disable */
export const log = (param, trace = true) => {
  /* eslint-enable */
  if (trace) logTrace(param);
  console.info(param);
  return param;
};

export const logTrace = param => {
  console.trace();
  return param;
};

/**
 * Return an object
 */
export const getPropertyByString = (accessor, obj) => {
  return accessor.split(".").reduce((acc, key) => (acc ? acc[key] : acc), obj);
};

export const toList = o => {
  return Object.keys(o || {}).map(key => o[key]);
};

export const toListKeyed = o => {
  return Object.keys(o || {}).map(key => ({ ...o[key], $$key: key }));
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Generate an Id for things (a unique id)
 */
export const generateId = prefix => {
  return (
    (prefix ? prefix : "") +
    "a" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const last = array =>
  array.length > 0 ? array[array.length - 1] : undefined;

export const toFieldList = o => {
  if (!o) return null;
  const createProperty = (key, value) => {
    if (Number.isInteger(value)) {
      return { $$key: key, index: value, name: key };
    } else {
      return { ...value, $$key: key };
    }
  };
  return Object.keys(o || {})
    .filter(key => o[key] || o[key] === 0)
    .map(key => createProperty(key, o[key]));
};
