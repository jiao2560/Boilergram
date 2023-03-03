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

export async function getUserByUsername(username) {
  const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username.toLowerCase())
      .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername,
    profileUserId) {
  const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', loggedInUserUsername)
      .where('following', 'array-contains', profileUserId)
      .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}


export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,
    isFollowingProfile,
) {
  return firebase
      .firestore()
      .collection('users')
      .doc(loggedInUserDocId)
      .update({
        following: isFollowingProfile ?
            FieldValue.arrayRemove(profileId) :
            FieldValue.arrayUnion(profileId),
      });
}

export async function updateFollowedUserFollowers(
    profileDocId,
    loggedInUserDocId,
    isFollowingProfile,
) {
  return firebase
      .firestore()
      .collection('users')
      .doc(profileDocId)
      .update({
        followers: isFollowingProfile ?
            FieldValue.arrayRemove(loggedInUserDocId) :
            FieldValue.arrayUnion(loggedInUserDocId),
      });
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return photos;
}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId,
) {
  await updateLoggedInUserFollowing(activeUserDocId,
      profileUserId, isFollowingProfile);

  await updateFollowedUserFollowers(profileDocId,
      followingUserId, isFollowingProfile);
}
