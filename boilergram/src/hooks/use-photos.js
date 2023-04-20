import {
  useState,
  useEffect,
} from 'react';
import {
  getPhotos,
  getUserByUserId,
} from '../services/firebase';


export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);
  console.log("photos9999 = ", photos)
  const getTimelinePhotos = async () => {
    if (!user) {
      let authUser = window.localStorage.getItem('authUser');
      if (authUser) {
        authUser = JSON.parse(authUser);
        const res = await getUserByUserId(authUser.uid);
        console.log('res = ', res);
        user = res[0];
      }
    }

    // example: [2, 1, 5] <- 2 being raphel
    if (user?.following?.length > 0) {
      const followedUserPhotos = await getPhotos(user.userId, user.following);
      console.log('followedUserPhotos = ', followedUserPhotos);


      // re-arrange array to be newest photos first by dateCreated
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
  };

  useEffect(() => {
    getTimelinePhotos();
  }, [user?.userId]);

  return {
    photos,
    getTimelinePhotos,
  };
}
