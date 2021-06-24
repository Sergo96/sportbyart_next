import { useState, useEffect } from 'react';
import styles from '../styles/AboutUs.module.css';
import Image from 'next/image';
import footballer from '../assets/footballer.png';
import axios from 'axios';

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState([]);

  console.log(aboutUs);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(`${process.env.customKey}/settings/about-us`);
      setAboutUs(res.data[0]);
    }
    loadData();
  }, []);

  console.log(aboutUs.about_us_image);

  const aboutUsImage = aboutUs.about_us_image;

  return (
    <div className={styles.aboutUsContain}>
      <div className={styles.aboutsUsWrapp}>
        <div className={styles.aboutUsTitle}>
          <h1>Մեր Մասին</h1>
        </div>
        <hr />
        <div className={styles.aboutUsContent}>
          <div className={styles.aboutUsThumb}>
            {/* <Image width={640} height={607} src={aboutUsImage} /> */}
          </div>
          <div className={styles.aboutUsContentInfo}>
            <div className={styles.aboutUsContentInfoText}>
              <h2>{aboutUs.about_us_title}</h2>
              <p>{aboutUs.about_us_content}</p>
            </div>
          </div>
        </div>
        <h1
          style={{
            marginBottom: 10,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '44px',
            lineHeight: '64px',
            color: 'black',
          }}
        >
          Հիմնադիր նախագահ
        </h1>
        <hr />
        <div className={styles.aboutUsAuthorContain}>
          <div className={styles.aboutUsAuthorImage}>
            <Image src={footballer} width={410} height={303} />
          </div>
          <div className={styles.aboutUsAuthorInfo}>
            <p>{aboutUs.about_us_author}</p>
          </div>
        </div>
      </div>

      {/* <div className={styles.aboutUsBlackBell}></div> */}
    </div>
  );
};

export default AboutUs;
