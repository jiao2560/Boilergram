import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function UsernameDisplay() {
  const [post, setPost] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUserId = user.uid;
        console.log(currentUserId); // check the value in the console
      } else {
        currentUserId = null;
      }
    });

    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("userId", "==", currentUserId));
    getDocs(userQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUsername(doc.data().customed_field);
        });
      })
      .catch((error) => {
        console.error(error);
      });
      alert(currentUserId);
  }, [currentUserId]);

  return <div>{username && <p>post: {post}</p>}</div>;
}

export default UsernameDisplay;
