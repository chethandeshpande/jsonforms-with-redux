import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProposalContainer from './ProposalContainer';
import DemoContainer from './DemoContainer';
// other imports...

const onClick = (data) => {
  return () => {
    console.log(data)
  }
}

export default () => (
  <Router>
    <Switch>
          <Route path="/proposal">
            <ProposalContainer />
          </Route>
          <Route path="/demo">
            <DemoContainer />
          </Route>
        </Switch>
  </Router>
)