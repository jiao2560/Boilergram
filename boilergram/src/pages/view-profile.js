
import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { getAuth, updateProfile , updateEmail, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export default function ResetPassword() {
    const auth = getAuth();

    const user = auth.currentUser;
    if (user != null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const fullName = user.fullName;
      const userID = user.userID;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      alert("username:"+displayName + "     " + "email:" +email);
    }
}
