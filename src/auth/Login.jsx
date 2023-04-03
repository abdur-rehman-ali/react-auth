import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "../api/axios";
import { AuthContext } from "../context/AuthProvider";

const LOGIN_URL = "/users/sign_in";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    try {
      const payload = {
        user: {
          email,
          password,
        },
      };
      const response = await axios.post(LOGIN_URL, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      let userName = response.data.data["username"];
      let userEmail = response.data.data["email"];
      setAuth({ userName, userEmail });
      const accessToken = response.headers.get("Authorization").split(" ")[1];
      localStorage.setItem("accessToken", accessToken);

      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrorMessage("Server not responding");
      } else {
        setErrorMessage(error.response?.data);
      }
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          {auth?.userName} - {auth?.userEmail}
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section>
          <h1>Login page</h1>
          <p className={errorMessage ? "errmsg" : "offscreen"}>
            {errorMessage}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailRef}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Login</button>
          </form>
          <span>
            Didn't have account yet ? <br />
            <Link to="/register">Register</Link>
          </span>
        </section>
      )}
    </>
  );
};

export default Login;
