import styles from '../../styles/Article.module.css';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Comment from './Comment/Comment';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { Markup } from 'interweave';

import { Carousel } from 'react-responsive-carousel';

const Article = () => {
  const [articleData, setArticleData] = useState([]);
  const [articleImages, setArticleImages] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);
  const articleContent = articleData.content;

  // console.log(comments);

  console.log(latestNewsArticles);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function loadData() {
      try {
        let slider_images = [];
        const res = await axios.get(`${process.env.customKey}/article/${id}`);
        setArticleData(res.data.article);
        Object.keys(res.data.slider).forEach((key) => {
          const sliderKey = res.data.slider[key];
          slider_images.push(sliderKey.image);
          setArticleImages([...slider_images]);
        });
      } catch (err) {}
    }
    loadData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.customKey}/comment/list/${id}`
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${process.env.customKey}/index`);
      setLatestNewsArticles(res.data.lastet_news);
    }
    loadData();
  }, []);

  const postComment = async (event) => {
    const commentData = {
      articleId: id,
      commentator_email: email,
      commentator_username: username,
      comment_content: content,
    };

    event.preventDefault();
    try {
      const response = await fetch(`${process.env.customKey}/comment/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      const json = await response.json();
      console.log(JSON.stringify(json));
      setComments([json, ...comments]);
    } catch (err) {
      console.log(err);
    }
    setUsername('');
    setEmail('');
    setContent('');
    // setComments('');
  };
  return (
    <>
      <div className={styles.aticleWrapp}>
        <div className={styles.articleWrapper}>
          <div className={styles.articleTitle}>
            <h1>{articleData.title}</h1>
            <hr />
            <p>{articleData.publication}</p>
            <hr />
          </div>
          <div className={styles.articleBody}>
            <div className={styles.mainArticle}>
              <div className={styles.sliderImage}>
                <Carousel showThumbs={false}>
                  {articleImages.map((sliderImage) => (
                    <div>
                      <Image
                        src={process.env.customKey + sliderImage}
                        width={850}
                        height={521}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className={styles.articleText}>
                {/* <p>{articleData.content}</p> */}
                <p>
                  <Markup
                    className={styles.articleTextPar}
                    content={articleContent}
                  />
                </p>
                {/* <Image
                  src={process.env.customKey + articleData.image}
                  width={850}
                  height={521}
                /> */}
              </div>
              <div className={styles.articleComments}>
                <h1>Թողնել Մեկնաբանություն</h1>
                <hr />
                <div className={styles.writeComment}>
                  <h3>ԱՆՈՒՆ</h3>
                  <div className={styles.commentInput}>
                    <input
                      type='text'
                      key='username'
                      placeholder='ԱՆՈՒՆ'
                      type='text'
                      onChange={(input) => setUsername(input.target.value)}
                      value={username}
                    />
                  </div>
                  <h3>էլեկտրոնային հասցե</h3>
                  <div className={styles.commentInput}>
                    <input
                      type='email'
                      onChange={(input) => setEmail(input.target.value)}
                      placeholder='email'
                      type='email'
                      value={email}
                    />
                  </div>
                  <h3>Մեկնաբանություն</h3>
                  <div className={styles.commentInput}>
                    <textarea
                      style={{
                        border: 'none',
                        margin: 7,
                        outline: 'none',
                        width: '95%',
                        resize: 'none',
                      }}
                      name='text'
                      cols='30'
                      rows='10'
                      onChange={(input) => setContent(input.target.value)}
                      value={content}
                    ></textarea>
                  </div>
                  <button onClick={postComment} type='submit'>
                    Հրապարակել
                  </button>
                </div>

                <hr style={{ marginTop: '40px' }} />
                <div className={styles.commentsList}>
                  <h1> Մեկնաբանություններ</h1>
                  <hr style={{ marginTop: '20px' }} />
                  <div className={styles.comments}>
                    {comments.map((comment) => (
                      <Comment
                        name={comment.username}
                        publication={comment.publication}
                        commentText={comment.content}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.latestArticles}>
              <h1>Վերջին նորություններ</h1>
              <hr
                style={{
                  background: '#FBA919',
                  paddingBottom: 2,
                  border: 'none',
                  marginBottom: 10,
                }}
              />
              {latestNewsArticles.map((article) => (
                <Link href='/article/[id]' as={`/article/` + article._id}>
                  <div className={styles.latestArticle}>
                    <h3>{article.title}</h3>
                    <h5>{article.shortDesc}</h5>
                    <p
                      style={{
                        color: '#FBA919',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '14px',
                        paddingBottom: 10,
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
    </>
  );
};

export default Article;
