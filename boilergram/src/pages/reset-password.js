import {useState, useContext, useEffect} from 'react';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {Link, useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmnewpassword, setconfirmnewpassword] = useState('');
  const auth = getAuth();

  const triggerResetEmail = async () => {
    console.log(email);
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
  };


  const handleSubmit = async () => {
    if (newpassword != confirmnewpassword) {
      alert('Passwords don\'t match');
    } else if (newpassword == oldpassword) {
      alert('New password and old password are the same');
    } else {
      alert('You are good to go');
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-fullbg-white p-4 rounded border border-gray-primary">
      <p className="text-sm">

        <input className="resetEmailInput1" placeholder="old password" name = "oldpassword" type="text" value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)} required/><br></br>

        <input className="resetEmailInput2" placeholder="new password" name = "newpassword" type="text" value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)} required/><br></br>

        <input className="resetEmailInput3" placeholder="confirm new password" name = "confirmnewpassword" type="text" value={confirmnewpassword}
          onChange={(e) => setconfirmnewpassword(e.target.value)} required/><br></br>

        <input className="resetEmailInput4" placeholder="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/><br></br>

        <button className="checkBtn" type="button" onClick={handleSubmit}>Check Password</button><br></br>

        <button className="resetBtn" type="button" onClick={triggerResetEmail}>reset password</button>
      </p>

    </div>
  );
}
