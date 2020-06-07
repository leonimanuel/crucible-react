import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
// import { Nav, NavItem, NavLink } from 'reactstrap';

import NavBar from "./components/navigation/NavBar.js"
import Console from "./containers/Console.js"

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/console" component={Console} />
      </div>      
    </Router>

  );
}

export default App;
        // <Route path="/home" component={Home} />
        // <Route path="/review" component={Review} />
        // <Route path="/groups" component={Groups} />