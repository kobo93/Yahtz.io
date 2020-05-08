import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//Routes
import PrivateRoute from "./components/common/PrivateRoute";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import Yahtz from "./components/yahtz/Yahtz";
import Leaderboard from "./components/leaderboard/Leaderboard";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App mainContainer">
            <Navbar />
            <div className="container contentContainer p-1">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/game" component={Yahtz} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
