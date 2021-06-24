import Layout from './components/Layout';

import styles from '../styles/Error.module.css';

export default function Custom404() {
  return (
    <>
      <div className={styles.errorWrap}>
        <div className={styles.errorContain}>
          <div className={styles.errorInfo}>
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
          </div>
          <div className={styles.errorBackground}></div>
        </div>
      </div>
    </>
  );
}
