import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.LoaderContainer}>
      <div className={styles.Loader}></div>
    </div>
  );
};

export default Loader;
