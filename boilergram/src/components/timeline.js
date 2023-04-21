import Skeleton from 'react-loading-skeleton';
import {useState} from 'react';
import Post from './post';
import sty from './timeline.module.css';
import usePhotos from '../hooks/use-photos';
import moment from 'moment';
import {storage, firestore} from '../lib/firebase';
import {addDoc, collection, updateDoc, doc} from 'firebase/firestore';

import {ref, uploadBytes} from 'firebase/storage';

export default function Timeline() {
  const {photos, getTimelinePhotos} = usePhotos();
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [curOpt, setCurOpt] = useState('ADD');
  const [curItem, setCurItem] = useState(null);
  console.log("photos = ", photos);
  const openEdit = (item) => {
    setCurOpt('EDIT');
    setDesc(item.desc);
    setImageSrc(item.imageSrc);
    setShow(true);
    setCurItem(item);
  };

  return (
    <div className="col-span-3 lg:col-span-2">
      <div className={sty.addBox}>
        <button
          onClick={() => {
            setCurOpt('ADD');
            setDesc('');
            setImageSrc('');
            setShow(true);
          }}
          className={sty.newBtn}
        >
          New Post
        </button>
      </div>
      {show && (
        <div className={sty.modal}>
          <button
            onClick={() => {
              setShow(false);
            }}
            className={sty.closeBtn}
          >
            close
          </button>
          <div className={sty.modalCenter}>
            <h3 className={sty.tit}>{curOpt == 'ADD' ? 'ADD' : 'EDIT'} POST</h3>
            <div className={sty.inputItem}>
              <div className={sty.inputItemLabel}>Description:</div>
              <textarea
                className={sty.inputItemForm}
                value={desc}
                onChange={(e) => {
                  console.log('e = ', e.target.value);
                  setDesc(e.target.value);
                }}
                cols="30"
                rows="5"
              />
            </div>

            <div className={sty.inputItem}>
              <div className={sty.inputItemLabel}>Image:</div>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  const uuid = moment().valueOf();
                  const url = `/images/users/test1/${uuid}_img`;
                  const storageRef = ref(storage, url);
                  uploadBytes(storageRef, file)
                      .then((snapshot) => {
                        console.log('Uploaded a file!');
                        setImageSrc(url);
                      })
                      .catch((err) => {
                        console.log('err = ', err);
                      });

                  console.log('file = ', file);
                }}
                type="file"
              />
            </div>


            <div className={sty.inputItem}>
              <div className={sty.inputItemLabel}>Video:</div>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  const uuid = moment().valueOf();
                  const url = `/images/users/test1/${uuid}_video`;
                  const storageRef = ref(storage, url);
                  uploadBytes(storageRef, file)
                      .then((snapshot) => {
                        console.log('Uploaded a file!');
                        setVideoSrc(url);
                      })
                      .catch((err) => {
                        console.log('err = ', err);
                      });

                  console.log('file = ', file);
                }}
                type="file"
              />
            </div>


            <div className={sty.addBox}>
              <button
                onClick={async () => {
                  // if (!desc) {
                  //   alert('Please enter a description');
                  //   return;
                  // }
                  // if (!imageSrc) {
                  //   alert('Please upload a picture');
                  //   return;
                  // }
                  // videoSrc
                  let u = window.localStorage.getItem('authUser');
                  if (u) {
                    u = JSON.parse(window.localStorage.getItem('authUser'));
                  } else {
                    u = {};
                  }
                  if (curOpt == 'ADD') {
                    await addDoc(collection(firestore, 'photos'), {
                      imageSrc,
                      desc,
                      userId: u.uid,
                      videoSrc
                    });
                    alert('ADD Success!');
                    setShow(false);
                    getTimelinePhotos();
                  } else {
                    try {
                      const docRef = doc(firestore, 'photos', curItem.docId);
                      await updateDoc(docRef, {
                        imageSrc,
                        desc,
                      });
                      alert('EDIT Success!');
                      setShow(false);
                      getTimelinePhotos();
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }}
                className={sty.newBtn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton key={index} count={1} width={320} height={400} />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post
            openEdit={openEdit}
            getTimelinePhotos={getTimelinePhotos}
            content={content}
          />
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
