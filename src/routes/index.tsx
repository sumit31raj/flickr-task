import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import { path } from './path';

const routes = () => (
  <Router>
    <Switch>
      <Route path={path.Home}>
        <Home />
      </Route>
    </Switch>
    <Redirect from="*" to={path.DefaultRoute} />
  </Router>
);

export default routes;