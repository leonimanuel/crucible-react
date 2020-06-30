import React,{ Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import { connect } from "react-redux"
// import { Nav, NavItem, NavLink } from 'reactstrap';

import SideNav from "./containers/SideNav.js"
import Home from "./containers/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"
import Review from "./containers/Review.js"
import Groups from "./containers/Groups.js"
import Login from "./components/authentication/Login.js"
import SignUp from "./components/authentication/SignUp.js"
import {API_ROOT} from "./constants"

import { logIn } from "./actions/users.js"
// import { isLoggedIn } from 

class App extends Component {
  componentDidMount() {
    this.props.logIn()  
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          {this.props.isLoggedIn ?
            <main>
              <SideNav />
              <Route exact path="/" component={Home} />
              <Route path="/console" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Console />} </Route>
              <Route path="/review" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Review />} </Route>
              <Route path="/groups" >{!this.props.isLoggedIn ? <Redirect to="login"/> : <Groups />} </Route>           
            </main>             
          : null
          }
            <Route path="/login"><Login/></Route>
            <Route path="/signup"><SignUp/></Route> 

        </div>      
      </Router>
    );
  }
}

export default connect(state => ({isLoggedIn: state.users.isLoggedIn}), { logIn })(App);




