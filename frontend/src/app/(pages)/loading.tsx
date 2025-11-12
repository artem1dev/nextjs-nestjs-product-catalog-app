import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
}