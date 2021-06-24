import styles from './CentreArticle.module.css';
import Image from 'next/image';

const CentreArticle = ({ image, title, author, date }) => {
  return (
    <div className={styles.centreArticleContainer}>
      <div className={styles.centreArticleThumb}>
        <Image
          src={image}
          width={406}
          height={253}
          className={styles.centreArticleThumb_img}
        />
      </div>

      <div className={styles.centreArticleInfo}>
        <h2>{title}</h2>

        <h4>
          <span>{author}</span> | {date}
        </h4>
      </div>
    </div>
  );
};

export default CentreArticle;
