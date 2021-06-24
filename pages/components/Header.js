import styles from './Header.module.css';
import HeaderLogo from '../../assets/Header/logo.svg';
import Search from '../../assets/Header/search.svg';

import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import LogoMobile from '../../assets/Header/logomobile.svg';
import Searchmob from '../../assets/Header/searchMob.svg';

import BugerIcon from '../../assets/Header/burgerIcon.svg';
import CloseIcon from '../../assets/Header/closeIcon.svg';

import SearchInput from '../../assets/Header/inputSearch.svg';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const [navMenu, setNavMenu] = useState(false);

  const [searchDropDown, setSearchDropDown] = useState(false); //this is for responsive search dropdown

  const [categories, setCategories] = useState([]);
  const [categoriesTitle, setCategoriesTitle] = useState([]);
  const [categoryId, setCategoryId] = useState([]);

  const [anotherCategories, setAnotherCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(
        `${process.env.customKey}/category/list/navbar`
      );
      setCategories(res.data);

      Object.keys(res.data).forEach((obj) => {
        const id = res.data[obj]._id;
        const title = res.data[obj].title;
        setCategoryId(id);
        setCategoriesTitle(title);
      });
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      const res = await axios.get(
        `${process.env.customKey}/category/list/another`
      );
      setAnotherCategories(res.data);
    }
    loadData();
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showSubMenu = () => {
    setNavMenu(!navMenu);
  };

  const showSearchInput = () => {
    setSearchDropDown(!searchDropDown);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.menu}>
            <div className={styles.headerTop}>
              <Link href='/'>
                <div
                  style={{ cursor: 'pointer' }}
                  className={styles.headerLogo}
                >
                  <Image src={HeaderLogo} height={81} width={90} />
                </div>
              </Link>

              <div className={styles.headerSearch}>
                <input placeholder='Որոնել ․ ․ ․' type='text' />
                <button>
                  <Image src={Search} height={17} width={17} alt='search' />
                </button>
              </div>

              <div className={styles.headerIcons}>
                <div className={styles.headerIcon}>
                  <FacebookIcon />
                </div>
                <div className={styles.headerIcon}>
                  <TelegramIcon />
                </div>
                <div className={styles.headerIcon}>
                  <InstagramIcon />
                </div>
                <div className={styles.headerIcon}>
                  <TwitterIcon />
                </div>
                <div className={styles.headerIcon}>
                  <YouTubeIcon />
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.headerBottom}>
              <ul className={styles.menuItems}>
                <li className={styles.listItem}>
                  <Link href='/'>Գլխավոր</Link>
                </li>
                {/* <Link href={{ pathname: '/videosPage' }}> */}
                <Link href='/videos/[id]' as={`/videos/` + 1}>
                  <li className={styles.listItem}>Տեսանյութեր</li>
                </Link>
                {categories.map((category) => (
                  <Link
                    href='/categoryarticles/[id]/[page]'
                    as={`/categoryarticles/${category._id}/${1}`}
                  >
                    <li className={styles.listItem}>{category.title}</li>
                  </Link>
                ))}

                <li className={styles.listItem}>
                  Այլ մարզաձևեր <span>▼</span>
                  <ul className={styles.dropdown}>
                    {anotherCategories.map((category) => {
                      return (
                        <Link
                          href='/categoryarticles/[id]/[page]'
                          as={`/categoryarticles/${category._id}/${1}`}
                        >
                          <li>{category.title}</li>
                        </Link>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobHeader}>
        <div className={styles.mobHeaderInner}>
          <div className={styles.logoMobile}>
            <Image src={LogoMobile} height={44} width={54} />
          </div>

          <div className={styles.mobileSearch} onClick={showSearchInput}>
            {searchDropDown ? (
              <Image src={CloseIcon} width={14} height={14} />
            ) : (
              <Image src={Searchmob} height={18} width={18} />
            )}
          </div>

          <div className={styles.mobMenu} onClick={showSidebar}>
            {sidebar ? (
              <Image src={CloseIcon} width={14} height={14} />
            ) : (
              <Image src={BugerIcon} width={18} height={12} />
            )}
          </div>
        </div>
        <div className={sidebar ? styles.topnav : styles.topnavNone}>
          <div id='myLinks'>
            {categories.map((category) => (
              <>
                <a>{category.title}</a>
                <hr />
              </>
            ))}

            <a onClick={showSubMenu}>
              <span>▼</span>| Այլ մարզաձևեր
            </a>
            <hr />
            <div className={navMenu ? styles.subNav : styles.subNavNone}>
              {anotherCategories.map((category) => {
                return <a>{category.title}</a>;
              })}
              <hr />
            </div>
            <hr />
          </div>
        </div>
        <div
          className={
            searchDropDown
              ? styles.mobileSearchInput
              : styles.mobileSearchInputNone
          }
        >
          <Image src={SearchInput} width={18} height={18} />
          <input placeholder='որոնել' type='text' />
        </div>
      </div>
    </>
  );
};

export default Header;
