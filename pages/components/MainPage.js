import LatestNews from './LatestNews/LatestNews';
import styles from './MainPage.module.css';

import RightArticle from './RightArticle/RightArticle';
import CentreArticle from './CentreArticle/CentreArticle';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';

const MainPage = () => {
  const [latesArticles, setLatesArticles] = useState([]);
  const [firstSectionArticle, setFirstSectionArticles] = useState([]);
  const [firstSectionArticleTitle, setFirstSectionArticlesTitle] = useState([]);
  const [secondSectionArticle, setSecondSectionArticles] = useState([]);
  const [secondSectionArticleTitle, setSecondSectionArticlesTitle] = useState(
    []
  );
  const [thirdSectionArticle, setThirdSectionArticles] = useState([]);
  const [thirdSectionArticleTitle, setThirdSectionArticlesTitle] = useState([]);
  const [fourthSectionArticle, setFourthSectionArticles] = useState([]);
  const [fourthSectionArticleTitle, setFourthSectionArticlesTitle] = useState(
    []
  );

  // console.log(firstSectionArticle);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${process.env.customKey}/index`);
      setLatesArticles(res.data.lastet_news);
      setFirstSectionArticlesTitle(Object.values(res.data.content)[0]);
      setFirstSectionArticles(Object.values(res.data.content)[0].articles);
      setSecondSectionArticlesTitle(Object.values(res.data.content)[1]);
      setSecondSectionArticles(Object.values(res.data.content)[1].articles);
      setThirdSectionArticlesTitle(Object.values(res.data.content)[2]);
      setThirdSectionArticles(Object.values(res.data.content)[2].articles);
      setFourthSectionArticlesTitle(Object.values(res.data.content)[3]);
      setFourthSectionArticles(Object.values(res.data.content)[3].articles);
    }
    loadData();
  }, []);

  return (
    <>
      <div className={styles.mainWrap}>
        <div className={styles.wrapper}>
          <div className={styles.latestNewsGrid}>
            {latesArticles.map((article) => (
              <Link href='/article/[id]' as={`/article/` + article._id}>
                <div className={styles.latestNewsArticle}>
                  <LatestNews
                    image={process.env.customKey + article.image}
                    title={article.title}
                    author={article.author_username}
                    date={article.publication}
                  />
                </div>
              </Link>
            ))}
          </div>
          {/* football news */}
          <div className={styles.footballNews}>
            <div className={styles.newsTitle}>
              <h1>{firstSectionArticleTitle.title}</h1>
              <hr />
            </div>
            <div className={styles.footballNewsGrid}>
              {firstSectionArticle.map((article) => (
                <Link href='/article/[id]' as={`/article/` + article._id}>
                  <div className={styles.footballNewsArticle}>
                    <RightArticle
                      src={process.env.customKey + article.image}
                      title={article.title}
                      shortDesc={article.shortDesc}
                      author={article.author_username}
                      date={article.publication}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* basketball news */}
          <div className={styles.basketballNews}>
            <div className={styles.newsTitle}>
              <h1>{secondSectionArticleTitle.title}</h1>
              <hr />
            </div>
            <div className={styles.basketballNewsGrid}>
              {secondSectionArticle.map((article) => (
                <Link href='/article/[id]' as={`/article/` + article._id}>
                  <div className={styles.basketballNewsArticle}>
                    <CentreArticle
                      image={process.env.customKey + article.image}
                      title={article.title}
                      author={article.author_username}
                      date={article.publication}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.blackBell}></div>

        <div className={styles.wrapper}>
          {/* wrestling news */}
          <div className={styles.footballNews}>
            <div className={styles.newsTitle}>
              <h1>{thirdSectionArticleTitle.title}</h1>
              <hr />
            </div>

            <div className={styles.footballNewsGrid}>
              {thirdSectionArticle.map((article) => (
                <Link href='/article/[id]' as={`/article/` + article._id}>
                  <div className={styles.footballNewsArticle}>
                    <RightArticle
                      src={process.env.customKey + article.image}
                      title={article.title}
                      shortDesc={article.shortDesc}
                      author={article.author_username}
                      date={article.publication}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* chess section */}
          <div className={styles.basketballNews}>
            <div className={styles.newsTitle}>
              <h1>{fourthSectionArticleTitle.title}</h1>
              <hr />
            </div>
            <div className={styles.basketballNewsGrid}>
              {fourthSectionArticle.map((article) => (
                <Link href='/article/[id]' as={`/article/` + article._id}>
                  <div className={styles.basketballNewsArticle}>
                    <CentreArticle
                      image={process.env.customKey + article.image}
                      title={article.title}
                      author={article.author_username}
                      date={article.publication}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
