import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home, Login, Register, Messenger } from './components/Index'
import './main.scss'


function App() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/messanger/login" exact></Route>
        <Route component={Register} path="/messanger/register" exact></Route>
        <Route component={Messenger} path="/"></Route>
      </Switch>
    </Router>
  );
}

export default App;
