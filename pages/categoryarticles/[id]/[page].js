import styles from '../../../styles/CategoryArticles.module.css';
import ArticleCategory from './ArticleCategory/ArticleCategory';

// import photo1 from '../../../assets/footballer.png';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const CategoryArticles = () => {
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [pageNumber, setPageNumber] = useState(); //here i have page numbers
  const [latestNewsCategoryArticles, setLatestNewsCategoryArticles] = useState(
    []
  );

  const router = useRouter();
  const { id } = router.query;
  const { page } = router.query;

  console.log(categoryArticles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.customKey}/category/${id}/${page}`
        );
        setCategoryArticles(res.data.articles);
        setCategoryName(res.data.articles[0].category_name);
        setPageNumber(res.data.pageCount);
      } catch (err) {}
    };
    fetchData();
  }, [id, page]);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${process.env.customKey}/index`);
      setLatestNewsCategoryArticles(res.data.lastet_news);
    }
    loadData();
  }, []);

  const pagination = () => {
    let pagesArray = [];
    let pageMinus = 3;
    let pagePlus = 10;

    if (page < 3) {
      pageMinus = 0;
    }

    if (pageNumber - page < 10) {
      pagePlus = 0;
    }
    for (let i = page - pageMinus; i < pageNumber + pagePlus; i++) {
      pagesArray.push(
        <Link
          href='/categoryarticles/[id]/[page]'
          as={`/categoryarticles/${id}/` + i}
        >
          <a style={{ margin: '10px' }} href=''>
            {i}
          </a>
        </Link>
      );
    }

    return pagesArray;
  };

  return (
    <div className={styles.categoryContain}>
      <div className={styles.categoryWrapp}>
        <div className={styles.categoryTitle}>
          <h1>{categoryName}</h1>
        </div>
        <hr />
        <div className={styles.mainCategoryArticleBody}>
          <div className={styles.categoryArticles}>
            {categoryArticles.map((article) => (
              <Link href='/article/[id]' as={`/article/` + article._id}>
                <div className={styles.categoryArticle}>
                  <ArticleCategory
                    src={process.env.customKey + article.image}
                    title={article.title}
                    shortDesc={article.shortDesc}
                    author={article.author_username}
                    date={article.publication}
                  />
                </div>
              </Link>
            ))}
            <div style={{ marginTop: '50px' }}>
              <center>{pagination()}</center>
            </div>
          </div>
          <div className={styles.latestCatArticles}>
            <h1>Վերջին նորություններ</h1>
            <hr
              style={{
                background: '#FBA919',
                paddingBottom: 2,
                border: 'none',
                marginBottom: 10,
              }}
            />
            {latestNewsCategoryArticles.map((article) => (
              <Link href='/article/[id]' as={`/article/` + article._id}>
                <div className={styles.latestCatArticle}>
                  <h3>{article.title}</h3>
                  <h5>{article.shortDesc}</h5>
                  <p
                    style={{
                      color: '#FBA919',
                      fontStyle: 'normal',
                      fontWeight: '600',
                      fontSize: '14px',
                      paddingBottom: 5,
                    }}
                  >
                    {article.publication}
                  </p>
                  <hr />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryArticles;
