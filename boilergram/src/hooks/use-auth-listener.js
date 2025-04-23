import {useState, useEffect, useContext} from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(
      JSON.parse(localStorage.getItem('authUser')),
  );
  const {firebase} = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // Have a authUser -> store the user in localstorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // Don't have an authUser -> clear the localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return {user};
}
