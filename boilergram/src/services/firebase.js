import {firebase, FieldValue} from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get();

  return result.docs.length > 0;
}
// Get user from the Firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().
      collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
