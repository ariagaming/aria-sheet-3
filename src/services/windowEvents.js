import firebase from "firebase";
import { dispatch } from "./redux";
import { getUserFromDatabase } from "./api";

const windowHashChange = e => {
  dispatch({
    type: "@NAVIGATE/hashchange",
    payload: window.location.hash.split("/")
  });
};

window.addEventListener("hashchange", windowHashChange, false);
dispatch({
  type: "@NAVIGATE/hashchange",
  payload: window.location.hash.split("/")
});

setTimeout(() => {
  const initFirebaseAuthentication = () => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        getUserFromDatabase(firebaseUser.uid)
          .andThen(mergeBackgroundImageUrlWithUser)
          .then(r => {
            r.palette = r.palette || palette;
            r.language = r.language || "en";
            r.lastLogin = new Date();
            dispatch({ type: "@AUTHENTICATION/login", payload: r });
            saveUser(r);
          });
      }
    });
  };
  initFirebaseAuthentication();
});
/* We'll also prefetch all of the entities in the application
This way we'll always have access to them. */

const palette = {
  DarkMuted: "rgba(0, 43, 55, 1.000)",
  DarkVibrant: "rgba(0, 63, 83, 1.000)",
  FontColor: "rgb(255, 255, 255)",
  LightMuted: "rgba(227, 193, 127, 1.000)",
  LightVibrant: "rgba(233, 245, 255, 1.000)",
  Muted: "rgba(145, 93, 170, 1.000)",
  Vibrant: "rgba(234, 60, 63, 1.000)"
};
