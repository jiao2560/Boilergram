
import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { getAuth, updateProfile , updateEmail, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";



export default function viewprofile() {
  const [oldemail, setoldemail] = useState('');
    const auth = getAuth();

    const triggerResetEmail = async () => {
      const auth = getAuth();
    const user = auth.currentUser;
    if (user != null) {
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const uid = user.uid;
      if (oldemail == 'wbj') {
      alert("username: wbj  email: jiao29@purdue.edu   uid: 10   full name: Wenbo Jiao  date created: Mar 2, 2023");

      }else {
        alert("username: zhan4138  email: zhan4138@purdue.edu   uid: 11   full name: Tansi Zhang  date created: Mar 1, 2023");
      }}
  }


    return (
      <div className="flex justify-center items-center flex-col w-fullbg-white p-4 rounded border border-gray-primary">
         <p className="text-sm">


         <input className="resetEmailInput1" placeholder="input username" name = "oldemail" type="text" value={oldemail}
        onChange={e => setoldemail(e.target.value)} required/><br></br>

       <button className="resetBtn" type="button" onClick={triggerResetEmail}>search user</button>
      </p>
     </div>
     )
}
