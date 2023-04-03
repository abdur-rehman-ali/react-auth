import React from "react";

import { useRef, useState, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/users";

const Register = () => {
  const emailRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

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

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = EMAIL_REGEX.test(email);
    const validUsername = USERNAME_REGEX.test(username);
    const validPassword = PASSWORD_REGEX.test(password);

    if (!validEmail) {
      setErrorMessage("Email is invalid");
      return;
    }

    if (!validUsername) {
      setErrorMessage("Username is invalid");
      return;
    }

    if (!validPassword) {
      setErrorMessage("Password is invalid");
      return;
    }

    if (!validMatchPassword) {
      setErrorMessage("Password and confirmation password must match!!!");
      return;
    }

    try {
      const payload = {
        user: {
          email,
          username,
          password,
        },
      };
      const response = await axios.post(REGISTER_URL, payload);
      console.log(response);

      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");

      setSuccess(true);
    } catch (error) {
      if(!error.response){
        setErrorMessage("Server not connected");
      }else{
        setErrorMessage(error.response.data.errors[0])
      }
      errorRef.current.focus()
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatchPassword(password === passwordConfirmation);
  }, [password, passwordConfirmation]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, username, password, passwordConfirmation]);

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}>
            {errorMessage}
          </p>
          <h1>Register User</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              required
              autoComplete="off"
            />
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
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              aria-invalid={!validUsername ? "true" : "false"}
              aria-describedby="usernameNote"
            />{" "}
            <p
              id="usernameNote"
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
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              aria-invalid={!validPassword ? "true" : "false"}
              aria-describedby="passwordNote"
            />{" "}
            <p
              id="passwordNote"
              className={
                password && passwordFocus && !validPassword
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
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
                  validPassword && validMatchPassword && passwordConfirmation
                    ? "valid"
                    : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatchPassword || !passwordConfirmation
                    ? "hide"
                    : "invalid"
                }
              />
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              onFocus={() => setPasswordConfirmationFocus(true)}
              onBlur={() => setPasswordConfirmationFocus(false)}
              aria-invalid={!validMatchPassword ? "true" : "false"}
              aria-describedby="passwordConfirmationNote"
            />{" "}
            <p
              id="passwordConfirmationNote"
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
          <span>
            Already have account  ? <br />
            <Link to="/login">Login</Link>
          </span>
        </section>
      )}
    </>
  );
};

export default Register;
