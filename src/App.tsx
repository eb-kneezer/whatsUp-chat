import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IconContext } from "react-icons";
import "./App.scss";
import * as ROUTES from "./Constants/routes";

import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className='App'>
        <Router>
          <Switch>
            <Route path={ROUTES.LOGIN} component={LoginPage} exact />
            <Route path={ROUTES.HOME} component={HomePage} exact />
          </Switch>
        </Router>
      </div>
    </IconContext.Provider>
  );
}

export default App;
