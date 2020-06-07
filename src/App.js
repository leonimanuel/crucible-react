import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
// import { Nav, NavItem, NavLink } from 'reactstrap';

import Home from "./containers/Home.js"
import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"
import Review from "./containers/Review.js"
import Groups from "./containers/Groups.js"
import Login from "./containers/Login.js"


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/console" component={Console} />
        <Route path="/review" component={Review} />
        <Route path="/groups" component={Groups} />
        <Route path="/login" component={Login} />        
      </div>      
    </Router>

  );
}

export default App;
