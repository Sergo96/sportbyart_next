import { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoCart.module.css';

const VideoCart = ({ src, title, author, date }) => {
  //   const [videoSrc, setVideoSrc] = useState('');

  //   const videoRef = useRef(null);

  //   useEffect(() => {
  //     const videosrc = URL.createObjectURL(new Blob([src], { type: 'video' }));
  //     setVideoSrc(videosrc);
  //   }, [src]);

  return (
    <div className={styles.videoArticleContainer}>
      <div className={styles.videoArticleThumb}>
        <ReactPlayer
          className={styles.videoVideo}
          width='100%'
          height='100%'
          url={src}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
          controls
        />
      </div>

      <div className={styles.videoArticleInfo}>
        <h2>{title}</h2>

        <h4>
          <span>{author}</span> | {date}
        </h4>
      </div>
    </div>
  );
};

export default VideoCart;
