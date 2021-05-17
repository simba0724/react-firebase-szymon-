import React from "react";
import ReactDOM from "react-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

import Firebase, { FirebaseContext } from './components/Firebase';

import App from "./app"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
