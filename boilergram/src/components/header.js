import {useContext} from 'react';
import {Link} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const {user} = useContext(UserContext);
  const {firebase} = useContext(FirebaseContext);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center
            align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Boilergram logo">
                <img src="/images/logo.png"
                  alt="Boilergram"
                  className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center
            align-items">
            {user ? (
                  <>
                    <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                      <svg
                        className="w-8 mr-6 text-black-light cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2
                        2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0
                        011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </Link>
                    <button
                      type="button"
                      title="Sign Out"
                      onClick={() => firebase.auth().signOut()}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          firebase.auth().signOut();
                        }
                      }}
                    >
                      <svg
                        className="w-8 mr-6 text-black-light cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6
                           4v1a3 3 0 01-3 3H6a3 3 0
                        01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center cursor-pointer">
                      <Link to={`/p/${user.displayName}`}>
                        <img
                          className="rounded-full h-8 w-8 flex"
                          src={`/images/avatars/${user.displayName}.jpg`}
                          alt={`${user.displayName} profile`}
                        />
                      </Link>
                    </div>
                  </>
              ) : (
                  <>
                    <Link to={ROUTES.LOGIN}>
                      <button
                        type="button"
                        className="bg-blue-medium font-bold text-sm rounded
                      text-white w-20 h-8"
                      >
                        Log In
                      </button>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
                      <button
                        type="button"
                        className="font-bold text-sm rounded text-blue-medium
                      w-20 h-8"
                      >
                        Sign Up
                      </button>
                    </Link>
                  </>
              )}
            <Link to={ROUTES.RESET_EMAIL}>
              <button
                type="button"
                className="bg-blue-medium font-bold text-sm rounded
                      text-white w-10 h-5"
              >
                        Reset Email
              </button>
            </Link>
            <Link to={ROUTES.RESET_USERNAME}>
              <button
                type="button"
                className="bg-blue-medium font-bold text-sm rounded
                      text-white w-10 h-5"
              >
                        Reset Username
              </button>
            </Link>
            <Link to={ROUTES.RESET_PROFILE}>
              <button
                type="button"
                className="bg-blue-medium font-bold text-sm rounded
                      text-white w-10 h-5"
              >
                        Reset Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
