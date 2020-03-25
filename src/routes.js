import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { Suspense, lazy } from "react";
//import AuthenticationContainer from "./master-pages/authentication-container";
import LoginContainer from "./master-containers/login-container/login-container";
//import DefaultContainer from "./master-pages/default-container";
//import AuthenticationContainer from "./master-pages/authentication-container";
import DefaultContainer from "./master-containers/default-container/default-container";

export default function Routes() {
  return (
      <Switch>
        <Route path="/" exact component={LoginContainer} />
        <Route path="/login" exact component={LoginContainer} />
        <Route path="/default" exact component={DefaultContainer} />
        <Route path="/chemical-area-ledger" exact component={DefaultContainer} />
        <Route path="/user-management" exact component={DefaultContainer} />
      </Switch>
  );
}