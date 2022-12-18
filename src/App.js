import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={ Login } path="/carteira" />
        <Route exact component={ Wallet } path="/trybewallet" />
      </Switch>
    </div>
  );
}

export default App;
