//import useInput from "../hooks/use-input";
import useInput from "../../../hooks/useInput";
import Button from "../../../UI/Button/Button";
import styles from "./OrderForm.module.css";

const isValueNotEmpty = (val) => val.trim().length !== 0;

const isEmailCorrect = (val) => val.trim().includes("@");

const isPhoneCorrect = (val) => val.trim().includes("+") && val.length > 10;

const OrderForm = (props) => {
  const {
    inputValue: nameInputValue,
    isInputValid: isNameInputValid,
    isErrorShown: isNameInputErrorShown,
    onInputChangeHandler: onNameInputChangeHandler,
    onInputBlurHandler: onNameInputBlurHandler,
    resetInputHadler: resetNameInputHadler,
  } = useInput(isValueNotEmpty);

  const {
    inputValue: lastNameInputValue,
    isInputValid: isLastNameInputValid,
    isErrorShown: isLastNameInputErrorShown,
    onInputChangeHandler: onLastNameInputChangeHandler,
    onInputBlurHandler: onLastNameInputBlurHandler,
    resetInputHadler: resetLastNameInputHadler,
  } = useInput(isValueNotEmpty);

  const {
    inputValue: emailInputValue,
    isInputValid: isEmailInputValid,
    isErrorShown: isEmailInputErrorShown,
    onInputChangeHandler: onEmailInputChangeHandler,
    onInputBlurHandler: onEmailInputBlurHandler,
    resetInputHadler: resetEmailInputHadler,
  } = useInput(isEmailCorrect);

  const {
    inputValue: phoneInputValue,
    isInputValid: isPhoneInputValid,
    isErrorShown: isPhoneInputErrorShown,
    onInputChangeHandler: onPhoneInputChangeHandler,
    onInputBlurHandler: onPhoneInputBlurHandler,
    resetInputHadler: resetPhoneInputHadler,
  } = useInput(isPhoneCorrect);

  const isFormValid =
    isNameInputValid &&
    isLastNameInputValid &&
    isEmailInputValid &&
    isPhoneInputValid;

  const onFormSubmitHandler = (evt) => {
    evt.preventDefault();
  };

  const onSendOrderClickhandler = () => {
    if (isFormValid) {
      props.onSubmitOrderHandler({
        name: nameInputValue,
        lastName: lastNameInputValue,
        email: emailInputValue,
        phone: phoneInputValue,
      });
      resetNameInputHadler();
      resetLastNameInputHadler();
      resetEmailInputHadler();
      resetPhoneInputHadler();
    }
  };

  return (
    <form onSubmit={onFormSubmitHandler} className={styles.FormContainer}>
      <div
        className={`${styles.FormControl} ${
          isNameInputErrorShown && styles.Invalid
        }`}
      >
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={nameInputValue}
          onChange={onNameInputChangeHandler}
          onBlur={onNameInputBlurHandler}
        />
        {isNameInputErrorShown && (
          <p className={styles.ErrorText}>The name is wrong</p>
        )}
      </div>
      <div
        className={`${styles.FormControl} ${
          isLastNameInputErrorShown && styles.Invalid
        }`}
      >
        <label htmlFor="lastname">Your last name</label>
        <input
          type="text"
          id="lastname"
          value={lastNameInputValue}
          onChange={onLastNameInputChangeHandler}
          onBlur={onLastNameInputBlurHandler}
        />
        {isLastNameInputErrorShown && (
          <p className={styles.ErrorText}>The last name is wrong</p>
        )}
      </div>
      <div
        className={`${styles.FormControl} ${
          isEmailInputErrorShown && styles.Invalid
        }`}
      >
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={emailInputValue}
          onChange={onEmailInputChangeHandler}
          onBlur={onEmailInputBlurHandler}
        />
        {isEmailInputErrorShown && (
          <p className={styles.ErrorText}>The Email address is wrong</p>
        )}
      </div>
      <div
        className={`${styles.FormControl} ${
          isPhoneInputErrorShown && styles.Invalid
        }`}
      >
        <label htmlFor="phone">Your Phone</label>
        <input
          type="phone"
          id="phone"
          placeholder="+380"
          value={phoneInputValue || "+380"}
          onChange={onPhoneInputChangeHandler}
          onBlur={onPhoneInputBlurHandler}
        />
        {isPhoneInputErrorShown && (
          <p className={styles.ErrorText}>The phone number is wrong</p>
        )}
      </div>
      <div className={styles.BtnContainer}>
        <Button onClick={props.hideModal} viewstyle="alt">
          Close
        </Button>
        <Button disabled={!isFormValid} onClick={onSendOrderClickhandler}>
          Send Order
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
