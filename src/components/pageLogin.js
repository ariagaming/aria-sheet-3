import React from "react";
import firebase from "firebase";
import "./../styles/pages/login.css";
import * as BaudinUI from "baudin-ui";
import {
  createModel,
  FormsEdit,
  Password,
  withState,
  Content,
  Row
} from "baudin-ui";

const LoginModel = createModel({
  email: String,
  password: Password
});
const state = LoginModel.generate();

export const PageLogin = withState((props, state) => (
  <Content className="page-login">
    <div className="login-container">
      <FormsEdit model={LoginModel} data={state} onChange={state.change} />
      <Row>
        <button
          onClick={() => {
            console.log(state);
          }}
        >
          Login
        </button>
      </Row>
    </div>
  </Content>
));
