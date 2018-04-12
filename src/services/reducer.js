//import { generateId } from "./../services/api";
import { CommandTypes } from "./actions";
// import a mock character
import { character } from "./data-mock-character";

const initialState = {
  version: "0.0.0",
  character: character,
  login:
    process.env.NODE_ENV === "development"
      ? { email: "ckelkboom@gmail.com", password: "Carlos" }
      : {}
};
export const reducer = (state = initialState, command) => {
  console.log(command.type);
  if (command.type === CommandTypes.login) {
    return { ...state, user: command.payload };
  } else if (command.type === CommandTypes.logout) {
    return { ...state, user: null };
  } else if (command.type === CommandTypes.toggleDialog) {
    const showDialog = state[command.payload] ? false : true;
    return {
      ...state,
      characterNew: showDialog ? { ...state.character } : null,
      [command.payload]: showDialog,
      data: showDialog ? state.data : {}
    };
  } else if (command.type === CommandTypes.selectData) {
    return {
      ...state,
      data: {
        ...state.data,
        [command.payload.key]: command.payload.value
      }
    };
  } else if (command.type === `${CommandTypes.retrievedWeapons}-success`) {
    return {
      ...state,
      weapons: command.payload
    };
  }
  return { ...state };
};

/*
// log the command.type
  if (process.env.NODE_ENV !== "production") {
    console.info(command.type);
  } else if (command.type === "change-login-field") {
    const { key, value } = command.payload;
    return {
      ...state,
      login: {
        ...state.login,
        [key]: value
      }
    };
  } else if (command.type === "@NAVIGATE/hashchange") {
    const blades = command.payload
      .map(bladeKey => ({
        id: generateId(),
        ...(navigation[bladeKey] || {})
      }))
      .filter(b => b.component);
    return {
      ...state,
      shell: {
        hash: window.location.hash
      },
      blades: blades
    };
  } else if (command.type === "@AUTHENTICATION/login") {
    return {
      ...state,
      user: command.payload,
      login: {
        email: state.login.email
      }
    };
  } else if (command.type === "@PROFILE/palette-changed-success") {
    return {
      ...state,
      user: command.payload
    };
  } else if (command.type === "@PROFILE/save-user-success") {
    return {
      ...state,
      user: command.payload
    };
  } else if (command.type === "@AUTHENTICATION/logout-success") {
    return {
      ...state,
      user: null
    };
  }

*/
