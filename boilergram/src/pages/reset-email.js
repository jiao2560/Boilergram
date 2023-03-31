import {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {getAuth, updateProfile, updateEmail, sendEmailVerification, sendPasswordResetEmail} from 'firebase/auth';


export default function ResetEmail() {
  const [oldemail, setoldemail] = useState('');
  const [newemail, setnewemail] = useState('');
  const [confirmnewemail, setconfirmnewemail] = useState('');
  const auth = getAuth();


  const triggerResetEmail = async () => {
    const auth = getAuth();
    updateEmail(auth.currentUser, newemail);


    const user = auth.currentUser;
    if (user != null) {
      const email = user.email;
      alert('email after changed:'+newemail);
    }
  };


  return (
    <div className="flex justify-center items-center flex-col w-fullbg-white p-4 rounded border border-gray-primary">
      <p className="text-sm">


        <input className="resetEmailInput1" placeholder="old email" name = "oldemail" type="text" value={oldemail}
          onChange={(e) => setoldemail(e.target.value)} required/><br></br>

        <input className="resetEmailInput2" placeholder="new email" name = "newemail" type="text" value={newemail}
          onChange={(e) => setnewemail(e.target.value)} required/><br></br>


        <input className="resetEmailInput3" placeholder="confirm new email" name = "confirmnewemail" type="text" value={confirmnewemail}
          onChange={(e) => setconfirmnewemail(e.target.value)} required/><br></br>

        <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset Email</button>
      </p>
    </div>
  );
}
