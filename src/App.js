import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"
// import { Nav, NavItem, NavLink } from 'reactstrap';

import Home from "./containers/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"
import Review from "./containers/Review.js"
import Groups from "./containers/Groups.js"
import Login from "./components/authentication/Login.js"

// import { isLoggedIn } from 

class App extends Component {
  // console.log()
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/console" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Console />} </Route>
          <Route path="/review" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Review />} </Route>
          <Route path="/groups" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Groups />} </Route>
          <Route path="/login"><Login/></Route>
        </div>      
      </Router>
    );
  }
}

export default connect(state => ({isLoggedIn: state.isLoggedIn}))(App);