import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

import HomeIcon from '../../assets/FooterImg/homeIcon.svg';
import PhoneIcon from '../../assets/FooterImg/phoneIcon.svg';
import MailIcon from '../../assets/FooterImg/letterIcon.svg';
import { useState, useEffect } from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import axios from 'axios';

const FooterLogo = require('../../assets/Header/logo.svg');

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const subscribeUser = async (e) => {
    const subscriberData = {
      email: subscribeEmail,
    };

    try {
      e.preventDefault();

      const response = await fetch(`${process.env.customKey}/subscribe/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      const json = await response.json();
      console.log(JSON.stringify(json));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <footer className={styles.footerKlass}>
      <div className={styles.footer}>
        <div className={styles.footer_first_wraper}>
          <div className={styles.footer_first_wraper_logo}>
            <Image src={FooterLogo} width={190} height={207} />
          </div>
          <ul className={styles.footer_first_wraper_info}>
            <li className={styles.footer_first_wraper_info_item}>
              <div className={styles.footer_first_wraper_info_item_icon}>
                <Image src={HomeIcon} width={21} height={18} />
              </div>
              <p className={styles.text_width}>հասցե։ Դավիթ Անհաղթ փողոց</p>
            </li>
            <li className={styles.footer_first_wraper_info_item}>
              <div className={styles.footer_first_wraper_info_item_icon}>
                <Image src={PhoneIcon} width={17} height={17} />
              </div>
              <p className={styles.text_width}>094308092</p>
            </li>
            <li className={styles.footer_first_wraper_info_item}>
              <div className={styles.footer_first_wraper_info_item_icon}>
                <Image src={MailIcon} width={21} height={18} />
              </div>
              <p className={styles.text_width}>sportbyart@mail.ru</p>
            </li>
          </ul>
        </div>
        <div className={styles.footer_second_wraper}>
          <div className={styles.footer_second_wraper_pages}>
            <ul className={styles.footer_second_wraper_pages_ul}>
              <li>
                <Link href='/'>Գլխավոր</Link>
              </li>
              <li>Գործընկերներ</li>
              <Link href='/videos/[id]' as={`/videos/` + 1}>
                <li>Տեսանյութեր</li>
              </Link>
            </ul>
            <ul className={styles.footer_second_wraper_pages_ul}>
              <Link href={{ pathname: '/aboutus' }}>
                <li>Մեր Մասին</li>
              </Link>
              <li>YO</li>
              <li>Այլ Մարզաձևվեր</li>
            </ul>
          </div>
          <form className={styles.footer_second_wraper_registration}>
            <div className={styles.footer_second_wraper_registration_input}>
              <input
                value={subscribeEmail}
                onChange={(input) => setSubscribeEmail(input.target.value)}
                type='email'
                placeholder='Էլ-հասցե'
              />
              <button onClick={subscribeUser()}>Բաժանորդագրվել</button>
            </div>
            <div className={styles.footer_second_wraper_registration_icons}>
              <div className={styles.footerIcon}>
                <FacebookIcon />
              </div>
              <div className={styles.footerIcon}>
                <TelegramIcon />
              </div>
              <div className={styles.footerIcon}>
                <InstagramIcon />
              </div>
              <div className={styles.footerIcon}>
                <TwitterIcon />
              </div>
              <div className={styles.footerIcon}>
                <YouTubeIcon />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.footer_line}>
        <div className={styles.footer_line_div}></div>
        <div className={styles.footer_line_text}>
          <div className={styles.footer_line_text_item}>
            <p>© 2021 Sport By Art - All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
