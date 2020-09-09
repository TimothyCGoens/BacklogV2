import React from "react";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import createBrowserHistory from "./history";
import setAuthenticationHeader from "./utilities/authenticate";
import requireAuth from "./Components/requireAuth";
import { BreakpointProvider } from "react-socks";

import "./App.css";

setAuthenticationHeader(localStorage.getItem("jsonwebtoken"));

function App() {
  return (
    <Provider store={store}>
      <Router history={createBrowserHistory}>
        <BreakpointProvider>
          <div className="App">
            <NavigationBar />
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={requireAuth(Profile)} />
              <Route path="/search" component={Search} />
            </Switch>
          </div>
        </BreakpointProvider>
      </Router>
    </Provider>
  );
}

export default App;
