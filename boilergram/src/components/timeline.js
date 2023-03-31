import Skeleton from 'react-loading-skeleton';
import Post from './post';
import usePhotos from '../hooks/use-photos';

export default function Timeline() {
  const {photos} = usePhotos();
  console.log('photos = ', photos);
  return (
    <div className="col-span-3 lg:col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton key={index} count={1} width={320} height={400} />
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post content={content} />
          // <div key={content.docId}>
          //   <img src={content.imageSrc} alt="" srcset="" />

          //   {content.imageSrc}
          // </div>
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
