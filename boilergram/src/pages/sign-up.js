import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {doesUsernameExist} from '../services/firebase';


export default function SignUp() {
  const history = useHistory();
  const {firebase} = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const usernameExists = await doesUsernameExist(username);

    if (1) {
      try {
        const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.sendEmailVerification();

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebase
            .firestore()
            .collection('users')
            .add({
              userId: createdUserResult.user.uid,
              username: username.toLowerCase(),
              fullName,
              emailAddress: emailAddress.toLowerCase(),
              following: [],
              followers: [],
              dateCreated: Date.now(),
            });

        history.push(ROUTES.LOGIN);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
        firebase.auth().signOut();
      }
    } else {
      if (/^[A-Z0-9._%+-]+@purdue.edu$/i.test(emailAddress)) {
        setUsername('');
        setError('That username is already taken, please try another.');
      } else {
        setEmailAddress('');
        setError('Please sign-up with a Purdue E-mail address.');
      };
      firebase.auth().signOut();
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Boilergram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md
                    items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/boilergram.png" alt="Boilergram Icon"/>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4
                        border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Boilergram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                         border border-gray-primary rounded mb-2"
              onChange={({target}) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                         border border-gray-primary rounded mb-2"
              onChange={({target}) => setFullName(target.value)}
              value={fullName}
            />
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full
                        bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
