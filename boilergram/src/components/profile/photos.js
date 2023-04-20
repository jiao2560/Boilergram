import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Photos({photos}) {
  console.log("photos222 = ", photos)
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ?
                    new Array(12).fill(0).map((_, i) =>
                      <Skeleton key={i} width={320} height={400} />) :
                    photos?.length > 0 ?
                        photos.map((photo) => (
                          <div key={photo.docId} style={{
                            border: '1px solid #ddd'
                          }} className="relative group">
                            {photo.imageSrc && (
                              <img src={photo.imageSrc} alt={photo.caption} />
                            )}
                            {photo.videoSrc && (
                              <video style={{
                                maxWidth: '100%'
                              }} controls src={photo.videoSrc}>
                              </video>
                            )}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'rgba(255,255,255,0.7)',
                              position: 'absolute',
                              right: 5,
                              top: 5,
                              padding: '5px 10px',
                              borderRadius: 10
                            }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              style={{
                                marginRight: 0
                              }}
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              tabIndex={0}
                              className={`w-8 mr-4 select-none
                              cursor-pointer focus:outline-none fill-red text-red-primary`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682
                                -7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l
                                -1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span style={{
                              marginRight: 10
                            }}>{photo.likes?.length || 0}</span>
                            <svg
                              className="w-8 text-black-light select-none
                              cursor-pointer focus:outline-none"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              tabIndex={0}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0
                                4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395
                                -3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span>{photo.comments?.length || 0}</span>
                            </div>

                            {/* <div className="absolute bottom-0
                             left-0 bg-gray-200 z-10 w-full
                             justify-evenly items-center h-full
                              bg-black-faded group-hover:flex hidden">
                              <p className="flex items-center
                               text-white font-bold">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-8 mr-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656
                                     0L10 6.343l1.172-1.171a4 4
                                     0 115.656 5.656L10 17.
                                     657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {photo.likes?.length || 0}
                              </p>

                              <p className="flex items-center
                               text-white font-bold">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-8 mr-4"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841
                                     8.841 0 01
                                    -4.083-.98L2 17l1.338-3.123C2.493 12.767
                                     2 11.434 2 10c0-3.866 3.582-7 8-7s8
                                      3.134 8 7zM7 9H5v2h2V9zm8
                                       0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {photo.comments?.length || 0}
                              </p>
                            </div> */}
                          </div>
                        )) :
                        null}
      </div>

      {!photos || (photos.length === 0 &&
          <p className="text-center text-2xl">No Posts Yet</p>)}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array,
};
