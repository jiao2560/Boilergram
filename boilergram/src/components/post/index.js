import {useRef} from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import {storage, firestore} from '../../lib/firebase';
import sty from './comment.module.css';

export default function Post({content, getTimelinePhotos, openEdit}) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div
      className="rounded col-span-4
     border bg-white border-gray-primary mb-12"
    >
      <Header username={content.username} headpic={content.headpic} />
      {content.imageSrc && (
        <Image src={content.imageSrc} caption={content.caption} />
      )}
      {content.desc && (
        <div className="px-3 pt-3 pb-0 text-sm text-gray-base">{content.desc}</div>
      )}
      {content.videoSrc && (
        <video controls style={{
          mawWidth: '100%'
        }} src={content.videoSrc}>
        </video>
      )}
      <div className={sty.optIndexBox}>
        <a
          onClick={async () => {
            console.log('content = ', content);
            try {
              await deleteDoc(doc(firestore, 'photos', content.docId));
              getTimelinePhotos();
              alert('Delete succeeded!');
            } catch (err) {
              console.log(err);
            }
          }}
          className={sty.delete}
        >
          Delete
        </a>
        <a onClick={() => {
          openEdit(content);
        }} className={sty.edit}>Edit</a>
      </div>
      <Actions
        docId={content.docId}
        totalLikes={content.likes?.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        getTimelinePhotos={getTimelinePhotos}
        docId={content.docId}
        comments={content.comments ? content.comments : []}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
