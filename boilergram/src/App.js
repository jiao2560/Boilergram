import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./pages/login'));
const Notfound = lazy(() => import('./pages/not-found'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading ... </p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.NOT_FOUND} component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
