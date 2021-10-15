import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login, Dashboard } from './pages';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path={'/'} component={Dashboard} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </>
  );
}

export default App;
