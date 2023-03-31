import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import sty from "./comment.module.css";
import AddComment from "./add-comment";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { storage, firestore } from "../../lib/firebase";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  getTimelinePhotos
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);
  const [show, setShow] = useState(false);
  const [val, setVal] = useState('');

  const showNextComments = () => {
    // setCommentsSlice(commentsSlice + 3);
    setShow(true);
  };

  return (
    <>
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
            {comments.map((item, index) => (
              <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                <Link to={`/p/${item.displayName}`}>
                  <span className="mr-1 font-bold">{item.displayName}</span>
                </Link>
                {item.edit ? (
                  <input
                    value={val}
                    onChange={(e) => {
                      setVal(e.target.value);
                    }}
                    type="text"
                  />
                ) : (
                  <span>{item.comment}</span>
                )}

                <div className={sty.optBox}>
                  <a
                    onClick={async () => {
                      let deepComments = [...comments];
                      deepComments.splice(index, 1);
                      try {
                        const docRef = doc(firestore, "photos", docId);
                        await updateDoc(docRef, {
                          comments: deepComments,
                        });
                        setComments(deepComments);
                        getTimelinePhotos()
                        alert("Delete succeeded!");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    className={sty.delete}
                  >
                    Delete
                  </a>
                  <a
                    onClick={async () => {
                      let deepComments = [...comments];
                      deepComments[index].edit = !deepComments[index].edit;
                      setComments(deepComments);
                      if (!deepComments[index].edit) {
                        try {
                          const docRef = doc(firestore, "photos", docId);
                          delete deepComments[index].edit
                          deepComments[index].comment = val;
                          await updateDoc(docRef, {
                            comments: deepComments,
                          });
                          getTimelinePhotos()
                          setComments(deepComments);
                          alert("Edit succeeded!");


                          
                        } catch (err) {
                          console.log(err);
                        }
                      }else{
                        setVal(item.comment);
                      }
                    }}
                    className={sty.edit}
                  >
                    {item.edit ? "Save" : "Edit"}
                  </a>
                </div>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {/* {comments.length >= 3 && commentsSlice < comments.length && ( */}
        <button
          className="text-sm text-gray-base
             mb-1 cursor-pointer focus:outline-none"
          type="button"
          onClick={showNextComments}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              showNextComments();
            }
          }}
        >
          View more comments
        </button>
        {/* )} */}
        <p className="text-gray-base uppercase text-xs mt-2">
          {posted ? formatDistance(posted, new Date()) : ""} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
