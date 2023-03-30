import React, { useState, useEffect, useRef } from "react";

import axios from "../api/axios";

const LOGIN_URL = "/users/sign_in";

const Login = () => {
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
      const accessToken = response.headers.get('Authorization').split(' ')[1];
      localStorage.setItem('accessToken', accessToken);

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
          <p>
            <a href="#">Go to Home</a>
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
        </section>
      )}
    </>
  );
};

export default Login;
