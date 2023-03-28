import React from "react";

import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const usernameRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [passwordConfirmationFocus, setPasswordConfirmationFocus] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${username} ${password}`);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatchPassword(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  return (
    <section>
      <h1>Register User</h1>
      {usernameFocus ? "true" : "false"}
      {passwordFocus ? "true" : "false"}
      {passwordConfirmationFocus ? "true" : "false"}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <FontAwesomeIcon
            icon={faCheck}
            className={validUsername ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validUsername || !username ? "hide" : "invalid"}
          />
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="off"
          ref={usernameRef}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />{" "}
        <p
          className={
            username && usernameFocus && !validUsername
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <br />
        <label htmlFor="password">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validPassword ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPassword || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />{" "}
        <p
          className={
            password && passwordFocus && !validPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <br />
        <label htmlFor="passwordConfirmation">
          Password Confirmation
          <FontAwesomeIcon
            icon={faCheck}
            className={
              validMatchPassword && passwordConfirmation ? "valid" : "hide"
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validMatchPassword || !passwordConfirmation ? "hide" : "invalid"
            }
          />
        </label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          autoComplete="off"
          onFocus={() => setPasswordConfirmationFocus(true)}
          onBlur={() => setPasswordConfirmationFocus(false)}
        />{" "}
        <p
          className={
            passwordConfirmation &&
            passwordConfirmationFocus &&
            !validMatchPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
        <br />
        <button
          disabled={
            !validUsername || !validPassword || !validMatchPassword
              ? true
              : false
          }
          type="submit"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
