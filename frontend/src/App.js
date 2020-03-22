import React from 'react';
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Pub } from './pages/pub'
import { Home } from './pages/home'
import { Stream } from './pages/stream'


function App() {
  return (
    <>
      <Helmet>
        <title>skei.pe</title>
        <link href="https://fonts.googleapis.com/css2?family=Neucha&family=Roboto&family=Barrio&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <Switch>
          <Route path="/pub/:pubName">
            <Pub />
          </Route>
          <Route path="/stream/:pubName">
            <Stream />
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
