import React from 'react';
import { Pub } from './pages/pub'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Home } from './pages/home'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/pub/:pubName">
            <Pub />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
