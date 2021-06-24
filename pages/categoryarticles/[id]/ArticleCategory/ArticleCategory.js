import styles from '../../../../styles/CategoryListArticle.module.css';
import Image from 'next/image';

const ArticleCategory = ({ src, title, shortDesc, author, date }) => {
  return (
    <div className={styles.categArticleContainer}>
      <div className={styles.categArticleThumb}>
        <Image
          className={styles.categArticleThumb_img}
          src={src}
          width={218}
          height={200}
        />
      </div>
      <div className={styles.categArticleInfo}>
        <h3>{title}</h3>
        <h4>{shortDesc}</h4>
        <p>
          <span>{author}</span> | {date}
        </p>
      </div>
    </div>
  );
};

export default ArticleCategory;
