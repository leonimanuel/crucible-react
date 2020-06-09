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
import rootURL from "./rootURL.js"
import { logIn } from "./actions/users.js"
// import { isLoggedIn } from 

class App extends Component {
  loadUser = () => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    // console.log(store)
    fetch(rootURL() + `/users/GETUSER`, configObj)
      .then(resp => resp.json())
      .then((data) => {
        if (data.name) {
          this.props.logIn({email: data.email})
        } else {
          console.log("nobody's logged in")
        }
      })
  }

  render() {
    this.loadUser()
    // console.log(this.props.isLoggedIn)
    return (
      <Router>
        <div className="App">
          <NavBar />
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/console" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Console />} </Route>
            <Route path="/review" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Review />} </Route>
            <Route path="/groups" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Groups />} </Route>
            <Route path="/login"><Login/></Route>            
          </main> 
        </div>      
      </Router>
    );
  }
}

export default connect(state => ({isLoggedIn: state.isLoggedIn}), { logIn })(App);




