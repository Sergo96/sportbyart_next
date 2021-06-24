import styles from './RightArticle.module.css';
import Image from 'next/image';

const RightArticle = ({ src, title, shortDesc, author, date }) => {
  return (
    <div className={styles.rightArticleContainer}>
      <div className={styles.rightArticleThumb}>
        <Image
          className={styles.rightArticleThumb_img}
          src={src}
          width={218}
          height={200}
        />
      </div>
      <div className={styles.rightArticleInfo}>
        <h3>{title}</h3>
        <h4>{shortDesc}</h4>
        <p>
          <span>{author}</span> | {date}
        </p>
      </div>
    </div>
  );
};

export default RightArticle;
