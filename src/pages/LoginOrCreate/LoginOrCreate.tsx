import { FormEvent, useRef, useState } from "react";
import "./LoginOrCreate.css";
import axios from "axios";

interface props {
  state: "login" | "create"
}

const LoginOrCreate = (props: props) => {
  const [activeTab, setActiveTab] = useState<"login" | "create">(props.state);

  // Login Refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // SignUp Refs
  const usernameSignUpRef = useRef<HTMLInputElement>(null);
  const emailSignUpRef = useRef<HTMLInputElement>(null);
  const passwordSignUpRef = useRef<HTMLInputElement>(null);

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const username = usernameSignUpRef.current?.value;
    const email = emailSignUpRef.current?.value;
    const password = passwordSignUpRef.current?.value;

    const variables = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.post("http://localhost:3000/register", variables);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    console.log("signUp");
    console.log(username, email, password);
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const variables = {email, password}

    try {
      const res = await axios.post("http://localhost:3000/login", variables);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    console.log("login");
    console.log(email, password);
  };

  return (
    <div className="containerHolder">
      <div className="box-container">
        <div className="tab-options">
          <button
            className={`tab bold-button ${
              activeTab === "login" ? "active" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            login
          </button>
          <button
            className={`tab bold-button ${
              activeTab === "create" ? "active" : ""
            }`}
            onClick={() => setActiveTab("create")}
          >
            create account
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "login" && (
            <div className="content active">
              <h2 className="bold">login</h2>
              <form onSubmit={handleLogin}>
                <label htmlFor="email">email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="enter your email"
                  ref={emailRef}
                />

                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="enter your password"
                  ref={passwordRef}
                />

                <button className="create bold-button" type="submit">
                  login
                </button>
              </form>
            </div>
          )}

          {activeTab === "create" && (
            <div className="content active">
              <h2 className="bold">create account</h2>
              <form onSubmit={handleSignUp}>
                <label htmlFor="username">username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="enter your username"
                  ref={usernameSignUpRef}
                />

                <label htmlFor="email-create">email:</label>
                <input
                  type="email"
                  id="email-create"
                  placeholder="enter your email"
                  ref={emailSignUpRef}
                />

                <label htmlFor="password-create">password:</label>
                <input
                  type="password"
                  id="password-create"
                  placeholder="create a password"
                  ref={passwordSignUpRef}
                />

                <button className="bold-button submit-button" type="submit">
                  submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginOrCreate;
