import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Homepage from "views/Homepage/index.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import Login from "views/Auth/Login.js";
import Register from "views/Auth/Register.js";
import Forgotpassword from "views/Auth/Forgotpassword.js";

import Dashboard from "views/Dashboard/Dashboard.js";
import Dashboard_people from "views/Dashboard/Dashboard_people.js";
import Dashboard_people_byid from "views/Dashboard/Dashboard_people_byid.js";

import { withAuthentication } from './components/Session';
import PrivateRoute from './components/Route/privateRoute';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

window.toast = function(msg, type="success"){
  toast[type](msg);
};

var hist = createBrowserHistory();

const AppBase = () => (
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Homepage} />

      <PrivateRoute path="/login" component={Login} />
      <PrivateRoute path="/register" component={Register} />
      <PrivateRoute path="/forgotpassword" component={Forgotpassword} />

      <PrivateRoute path="/profile" component={ProfilePage}/>
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <PrivateRoute exact path="/dashboard_people" component={Dashboard_people}/>
      <PrivateRoute path="/dashboard_person/:id" component={Dashboard_people_byid}/>
      <PrivateRoute path="/dshboard_addperson" component={Dashboard_people_byid}/>
    </Switch>
  </Router>
)

const App = withAuthentication(AppBase);

export default App;