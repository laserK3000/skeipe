import React from 'react';
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Pub } from './pages/pub'
import { Home } from './pages/home'

function App() {
  return (
    <>
      <Helmet>
        <title>skei.pe</title>
        <link rel="icon" type="image/png" href="(GENAUE PFADANGABE/DATEINAME.png"></link>
      </Helmet>
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
