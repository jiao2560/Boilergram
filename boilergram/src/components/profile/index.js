import {useReducer, useEffect} from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import {getUserPhotosByUserId} from '../../services/firebase';
import {
  getStorage,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import {
  firebase,
  FieldValue,
  storage,
} from '../../lib/firebase';

export default function Profile({user}) {
  const reducer = (state, newState) => ({...state, ...newState});
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };

  const [{profile, photosCollection, followerCount}, dispatch] = useReducer(
      reducer,
      initialState,
  );


  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);

      for(let i = 0; i < photos.length; i++) {
        let photo = photos[i];
        if (photo.imageSrc) {
          let url = await getDownloadURL(ref(storage, photo.imageSrc));
          photo.imageSrc = url;
        }
        if (photo.videoSrc) {
          let url = await getDownloadURL(ref(storage, photo.videoSrc));
          photo.videoSrc = url;
        }
      }


      dispatch({profile: user, photosCollection:
          photos, followerCount: user.followers.length});
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
