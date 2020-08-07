import React from "react";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Search from "./Components/Search";
import Backlog from "./Components/Backlog";
import Profile from "./Components/Profile";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import { Router, Switch, Route } from "react-router-dom";
import createBrowserHistory from "./history";
import setAuthenticationHeader from "./utilities/authenticate";
import requireAuth from "./Components/requireAuth";
import thunk from "redux-thunk";

import "./App.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

setAuthenticationHeader(localStorage.getItem("jsonwebtoken"));

function App() {
  return (
    <Provider store={store}>
      <Router history={createBrowserHistory}>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/search" component={Search} />
            <Route path="/backlog" component={Backlog} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
