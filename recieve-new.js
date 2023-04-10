import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { deleteUser } from 'firebase/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const [tweets, setTweets] = useState([]);

  const fetchPurdueNewsFromTwitter = async () => {
    const twitterSearchUrl = 'https://api.twitter.com/2/tweets/search/recent?query=(from:purdue OR from:PurdueExponent OR from:PurdueSports OR from:LifeAtPurdue) (lang:en) -is:retweet&max_results=10&tweet.fields=created_at';

    try {
      const response = await axios.get(twitterSearchUrl, {
        headers: {
          'Authorization': 'OndyJrLRbwE0zMEIo6k799IuUgh9UGhWMLCLWbsElpBIY',
        },
      });

      if (!response || !response.data || !response.data.data) {
        console.error('Failed to fetch Purdue news from Twitter: No response data');
        return;
      }

      const newsArray = response.data.data.map(tweet => {
        const text = tweet.text;
        const date = tweet.created_at;

        return {
          text,
          date,
        };
      });

      console.log('Parsed news data:', newsArray);

      setNewsList(newsArray);
    } catch (error) {
      console.error('Failed to fetch Purdue news from Twitter:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('handleLogin called'); // Log when handleLogin is called

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(emailAddress, password);

      const user = userCredential.user;

      if (!user.emailVerified) {
        if (
          Date.parse(user.metadata.creationTime) + 24 * 3600 * 1000 <
          Date.now()
        ) {
          setError(
            'You did not verify the email within 24 hours, the account has been deleted, please sign up again.'
          );
          firebase.auth().signOut();
          deleteUser(user);
        } else {
          setError('Please verify your email.');
          firebase.auth().signOut();
        }
      } else {
        await fetchPurdueNewsFromTwitter();

        setTimeout(() => {
          history.push(ROUTES.DASHBOARD);
        }, 3000); // Add a 3 seconds delay before navigating
      }
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
      firebase.auth().signOut();
    }
  };

  useEffect(() => {
    document.title = 'Login - Boilergram';
  }, []);





  return (
    <div
      className="container flex mx-auto
                max-w-screen-md items-center h-screen"
                >
                   <ToastContainer />
                <div className="flex w-3/5">
                  <img src="/images/boilergram.png" alt="Boilergram Icon" />
                </div>
                <div className="flex flex-col w-2/5">
                  <div
                    className="flex flex-col items-center bg-white p-4
                                  border border-gray-primary mb-4"
                  >
                    <h1 className="flex justify-center w-full">
                      <img
                        src="/images/logo.png"
                        alt="Boilergram"
                        className="mt-2 w-6/12 mb-4"
                      />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method="POST">
                      <input
                        aria-label="Enter your email address"
                        type="text"
                        placeholder="Email"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                   border border-gray-primary rounded mb-2"
                        onChange={({target}) => setEmailAddress(target.value)}
                        value={emailAddress}
                      />
                      <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                   border border-gray-primary rounded mb-2"
                        onChange={({target}) => setPassword(target.value)}
                        value={password}
                      />
                      <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-white w-full
                                    rounded h-8 font-bold
                                    ${isInvalid && 'opacity-50'}`}
                      >
                        Log in
                      </button>
                    </form>
                  </div>
                  <div
                    className="flex justify-center items-center flex-col w-full
                                  bg-white p-4 rounded border border-gray-primary"
                  >
                    <p className="text-sm">
                      Don&apos;t have an account?{` `}
                      <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                        Sign up
                      </Link>
                    </p>
                  </div>

                  <div
                    className="flex justify-center items-center flex-col w-full
                                  bg-white p-4 rounded border border-gray-primary"
                  >
                    <p className="text-sm">
                      <Link
                        to={ROUTES.RESET_PASSWORD}
                        className="font-bold text-blue-medium"
                      >
                        Reset password
                      </Link>
                    </p>
                  </div>
                </div>

              </div>
            );
          }

