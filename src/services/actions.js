import { dispatch } from "./redux";
import firebase from "firebase";

export const CommandTypes = {
  // dialogs
  toggleDialog: "@DIALOG/toggle",

  // selections of data
  selectData: "@DATA/select",
  retrievedWeapons: "@DATA/retrieved-weapons",

  // auth
  login: "@AUTH/login",
  logout: "@AUTH/logout"
};

export const toggleDialog = dialogName => {
  dispatch({ type: CommandTypes.toggleDialog, payload: dialogName });
};

export const selectData = (key, value) => {
  dispatch({ type: CommandTypes.selectData, payload: { key, value } });
};

export const retrievedWeapons = weapons => {
  dispatch({ type: CommandTypes.retrievedWeapons, payload: weapons });
};

export const login = user => {
  dispatch({ type: CommandTypes.login, payload: user });
};

export const logout = () => {
  firebase.auth().signOut();
  dispatch({ type: CommandTypes.logout });
};
