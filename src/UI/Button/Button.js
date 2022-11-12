import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${styles.Button} ${
        props.viewstyle === "alt" ? styles.ButtonAlt : null
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
