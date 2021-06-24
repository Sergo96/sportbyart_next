import styles from './LatestNews.module.css';
import Image from 'next/image';

const LatestNews = ({ image, title, author, date }) => {
  return (
    <div className={styles.latestNewsContainer}>
      <div className={styles.latestNewsThumb}>
        <Image
          className={styles.latestNewsThumb_img}
          src={image}
          width={520}
          height={350}
        />
      </div>
      <div className={styles.latestNewsInfo}>
        <h2>{title}</h2>

        <h4>
          <span>{author}</span> | {date}
        </h4>
      </div>
    </div>
  );
};

export default LatestNews;
