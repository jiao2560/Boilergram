import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'));

const ResetPassword = lazy(() => import('./pages/reset-password'));
const ResetUsername = lazy(() => import('./pages/reset-username'));
const ResetEmail = lazy(() => import('./pages/reset-email'));
const ResetProfile = lazy(() => import('./pages/reset-profile'));

export default function App() {
  const {user} = useAuthListener();

  return (
    <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login}/>
            <Route path={ROUTES.SIGN_UP} component={SignUp}/>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard}/>

            <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword}/>
            <Route path={ROUTES.RESET_USERNAME} component={ResetUsername}/>
            <Route path={ROUTES.RESET_EMAIL} component={ResetEmail}/>
            <Route path={ROUTES.RESET_PROFILE} component={ResetProfile}/>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
