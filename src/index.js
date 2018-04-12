import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import { Provider } from "react-redux";
import { store, dispatch, simpleConnectMyComponent } from "./services/redux";
import { login, logout } from "./services/actions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PageCharacterSheet } from "./components/pageCharacterSheet";
import { PageLogin } from "./components/pageLogin";
import { PageSetting } from "./components/pageSetting";
import { PageHome } from "./components/pageHome";
import { PageDocumentation } from "./components/pageDocumentation";
import { MenuMain } from "./components/menuMain";
import { DialogWeapons } from "./components/dialogWeapons";
import "./styles/main.css";
import registerServiceWorker from "./registerServiceWorker";
// import Weapons from "./mocks/weapons";
// import Races from "./mocks/__races";
// import Classes from "./mocks/__classes";
// import Monk from "./mocks/__monk";

/**
 * Extend some objects with a few helpers
 */
require("./helpers");

/**
 * Initialize firebase
 */
var config = {
  apiKey: "AIzaSyDAuTRkV2P3R_AhEWD2oX02Gc5u4CzBM68",
  authDomain: "aria-rpg.firebaseapp.com",
  databaseURL: "https://aria-rpg.firebaseio.com",
  projectId: "aria-rpg",
  storageBucket: "",
  messagingSenderId: "233226834760"
};
firebase.initializeApp(config);

const MainPage = simpleConnectMyComponent(
  ({ user }) =>
    user ? (
      <Router>
        <div>
          <div>
            <MenuMain />
          </div>
          <div>
            <Route path="/home" component={PageHome} />
            <Route path="/sheet" component={PageCharacterSheet} />
            <Route path="/setting" component={PageSetting} />
            <Route path="/documentation" component={PageDocumentation} />
          </div>
          <DialogWeapons />
        </div>
      </Router>
    ) : (
      <PageLogin />
    )
);

/* React, do your thing! */
ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById("root")
);

/* Do some client side caching through a service worker */
registerServiceWorker();

(() => {
  //   firebase
  //     .database()
  //     .ref("classes")
  //     .once("value")
  //     .then(snapshot => {
  //       const data = snapshot.val();
  //       console.log(data);
  //     });
  /*
  Classes.forEach($class => {
    const newId = generateId("class_");
    firebase
      .database()
      .ref(`classes/${newId}`)
      .set({ ...$class, id: newId });
  });
  const newId = generateId("class_");
  firebase
    .database()
    .ref(`classes/${newId}`)
    .set({ ...Monk, id: newId });

    */

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      login(user);
    } else {
      logout();
    }
  });
})();
