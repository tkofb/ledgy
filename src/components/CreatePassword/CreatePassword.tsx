import React, { forwardRef, useState } from "react";
import zxcbn from "zxcvbn";
import "./CreatePassword.css";

interface props {
  confirm?: boolean;
}

const CreatePassword = forwardRef<HTMLInputElement, props>((props, ref) => {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [passwordText, setPasswordText] = useState("Password Strength");

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check"
      viewBox="0 0 16 16"
      color="green"
    >
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
    </svg>
  );

  const xIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-x"
      viewBox="0 0 16 16"
      color="red"
    >
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );

  const [hasUppercase, setHasUppercase] = useState(xIcon);
  const [hasNumber, setHasNumber] = useState(xIcon);
  const [isEightCharacters, setIsEightCharacters] = useState(xIcon);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(xIcon);

  const handleCapsDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    const strength = zxcbn(password);
    const currStrengthLevel = strength.score;

    setStrengthLevel(currStrengthLevel);

    if (currStrengthLevel == 0) {
      setPasswordText("Password Strength");
    } else if (currStrengthLevel == 1) {
      setPasswordText("Very Weak");
    } else if (currStrengthLevel == 2) {
      setPasswordText("Weak");
    } else if (currStrengthLevel == 3) {
      setPasswordText("Good");
    } else if (currStrengthLevel == 4) {
      setPasswordText("Strong");
    }

    setIsEightCharacters(password.length >= 8 ? checkIcon : xIcon);
    setHasUppercase(/.*[A-Z]+.*/.test(password) ? checkIcon: xIcon)
    setHasNumber(/.*[0-9]+.*/.test(password) ? checkIcon: xIcon)
    setHasSpecialCharacter(/[!@#$%^&*()\-+={}[\]:;"'<>,.?/|\\]/.test(password) ? checkIcon: xIcon)

    // (/.*/.test(password)) ? setHasUppercase(checkIcon) : set
  
  };

  return (
    <div className="createPassword">
      <div className="topPasswordPart">
        <div className="capsLock">
          <label htmlFor="password-create">
            {props.confirm ? "confirm password:" : "password:"}
          </label>
          {capsLockOn && (
            <div className="capsInfo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-info-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
              </svg>
              <span>caps lock on</span>
            </div>
          )}
        </div>
        <div className="passwordInputPart">
          <input
            type={showPassword ? "text" : "password"}
            id={props.confirm ? "confirmPassword" : "createPassword"}
            placeholder="create a password"
            onKeyDown={handleCapsDown}
            onChange={handlePasswordChange}
            ref={ref}
          />
          <span className="passwordInputText" onClick={handleShowPassword}>
            {showPassword ? "hide" : "show"}
          </span>
        </div>
      </div>
      {!props.confirm && (
        <>
          <div className="bottomPasswordPart">
            <div
              className={`strengthLevel ${
                strengthLevel >= 1 ? `active-${strengthLevel}` : ""
              }  `}
            >
              &nbsp;
            </div>
            <div
              className={`strengthLevel ${
                strengthLevel >= 2 ? `active-${strengthLevel}` : ""
              }  `}
            >
              &nbsp;
            </div>
            <div
              className={`strengthLevel ${
                strengthLevel >= 3 ? `active-${strengthLevel}` : ""
              }  `}
            >
              &nbsp;
            </div>
            <div
              className={`strengthLevel ${
                strengthLevel >= 4 ? `active-${strengthLevel}` : ""
              }  `}
            >
              &nbsp;
            </div>
          </div>
          <div className="textPart">
            <span className="strength">{passwordText}</span>
          </div>

          <div className="isEightLong">
            {isEightCharacters}
            <span>at least 8 chars.</span>
          </div>
          <div className="hasUppercase">
            {hasUppercase}
            <span>at least 1 uppercase</span>
          </div>
          <div className="hasNumber">
            {hasNumber}
            <span>at least 1 number</span>
          </div>
          <div className="hasSpecial">
            {hasSpecialCharacter}
            <span>at least 1 special character</span>
          </div>
        </>
      )}
    </div>
  );
});

export default CreatePassword;
