import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/VideosPage.module.css';
import VideoCart from '../components/VideoCart/VideoCart';
import axios from 'axios';
import Link from 'next/link';

const pageVideo = () => {
  const [videos, setVideos] = useState([]);
  const [pageNumber, setPageNumber] = useState(); //here i have page numbers
  const router = useRouter();
  const { id } = router.query;

  console.log(videos);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${process.env.customKey}/video/list/${id}`);
      setVideos(res.data.videos);
      setPageNumber(res.data.pageCount);
    }
    loadData();
  }, [id]);

  const pagination = () => {
    let pagesArray = [];
    let pageMinus = 3;
    let pagePlus = 10;

    if (id < 3) {
      pageMinus = 0;
    }

    if (pageNumber - id < 10) {
      pagePlus = 0;
    }
    for (let i = id - pageMinus; i < pageNumber + pagePlus; i++) {
      pagesArray.push(
        <Link href='/videos/[id]' as={`/videos/` + i}>
          <a style={{ margin: '10px' }} href=''>
            {i}
          </a>
        </Link>
      );
    }
    return pagesArray;
  };

  return (
    <div className={styles.videosContain}>
      <div className={styles.videosWrapp}>
        <div className={styles.videosTitle}>
          <h1>Տեսանյութեր</h1>
        </div>
        <hr />

        <div className={styles.videos}>
          {videos.map((video) => (
            <div className={styles.videoCart}>
              <VideoCart
                src={video.video}
                title={video.title}
                author={video.author_username}
                date={video.publication}
              />
            </div>
          ))}
        </div>
        <center>{pagination()}</center>
      </div>
    </div>
  );
};

export default pageVideo;
