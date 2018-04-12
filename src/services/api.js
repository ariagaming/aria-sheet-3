import firebase from "firebase";
import { toList } from "./../helpers";
import { CommandTypes, retrievedWeapons } from "./actions";

/**
 * log in to firebase with email and password
 * @param {String} email
 * @param {String} password
 */
export const loginWithEmailAndPassword = (email, password) => {
  const auth = firebase.auth();

  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ uid, displayName }) => {
        resolve({ uid, email, displayName, lastLoggedIn: new Date() });
      })
      .catch(error => reject(error));
  });
};
loginWithEmailAndPassword.messageType = "@AUTHENTICATION/login";

/**
 * Get the user information by id
 * @param {String || Object {id: String} } id
 */
export const getUserFromDatabase = o => {
  const id = o.id || o.uid || o;
  const database = firebase.database();
  return new Promise(resolve => {
    database
      .ref(`users/${id}`)
      .once("value")
      .then(snapshot => {
        const value = snapshot.val();
        resolve({ ...value, id: id });
      });
  });
};

/**
 * log out of our system
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(resolve, reject);
  });
};
logout.messageType = "@AUTHENTICATION/logout";

/**
 * Navigate to another hash location.
 * @param {String} hash
 */
export const navigate = hash => {
  window.location.hash = hash;
};

/**
 * Generate an Id for things (a unique id)
 */
export const generateId = () => {
  return (
    "$$" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const retrieveWeapons = () => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("weapons")
      .once("value")
      .then(snapshot => {
        resolve(toList(snapshot.val()));
      });
  });
};

export const saveWeapon = weapon => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`weapons/${weapon.id}`)
      .update(weapon)
      .then(r => {
        console.log(r);
        resolve(r);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
