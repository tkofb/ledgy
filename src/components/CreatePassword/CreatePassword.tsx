import React, { forwardRef, useState } from "react";
import zxcbn from "zxcvbn";
import "./CreatePassword.css";

interface props {
  confirm?: boolean;
}

const CreatePassword = forwardRef<HTMLInputElement, props>((props, ref) => {
  const [capsLockOn, setCapsLockOn] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [passwordText, setPasswordText] = useState("Password Strength");

  const handleCapsDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  const handleStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  // const handleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

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
            // type={showPassword ? "text" : "password"}
            type="password"
            id="createPassword"
            placeholder="create a password"
            onKeyDown={handleCapsDown}
            onChange={handleStrength}
            ref={ref}
          />
          {/* <span className="passwordInputText" onClick={handleShowPassword}>
            {showPassword ? "hide" : "show"}
          </span> */}
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
        </>
      )}
    </div>
  );
});

export default CreatePassword;
