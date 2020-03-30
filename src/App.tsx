import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import PerCountryPage from "./components/pages/PerCountryPage"

const App = () => (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <PerCountryPage />
        </Route>
      </Switch>
    </BrowserRouter>
)

export default App;
