import styles from "./Input.module.css";

const Input = (props) => {
  const value = Math.min(props.input.max, props.input.value);
  return (
    <div className={`${styles.input} ${props.customClass}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} value={value} />
    </div>
  );
};

export default Input;
