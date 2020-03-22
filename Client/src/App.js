import React from "react";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Search from "./Components/Search";
import Backlog from "./Components/Backlog";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
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
  );
}

export default App;
