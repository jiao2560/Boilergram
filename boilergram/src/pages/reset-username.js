import {useState, useContext, useEffect} from 'react';
import { getAuth, updateProfile , updateEmail, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

export default function ResetEmail() {
    const [oldemail, setoldemail] = useState('');
    const [newemail, setnewemail] = useState('');
    const [confirmnewemail, setconfirmnewemail] = useState('');
    const auth = getAuth();


     const triggerResetEmail = async () => {
        const auth = getAuth();
       updateProfile(auth.currentUser, {
        displayName: oldemail
      });


       const user = auth.currentUser;
    if (user != null) {
      const displayName = user.displayName;
      const email = user.email;
      alert("username after changed:"+displayName);
    }
     }


    return (
     <div className="flex justify-center items-center flex-col w-fullbg-white p-4 rounded border border-gray-primary">
        <p className="text-sm">


        <input className="resetEmailInput1" placeholder="new username" name = "oldemail" type="text" value={oldemail}
       onChange={e => setoldemail(e.target.value)} required/><br></br>

      <button className="resetBtn" type="button" onClick={triggerResetEmail}>Reset username</button>
     </p>
    </div>
    )
}
