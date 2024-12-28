import { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "create">("login");

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
              <form>
                <label htmlFor="email">email:</label>
                <input type="email" id="email" placeholder="enter your email" />

                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="enter your password"
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
              <form>
                <label htmlFor="username">username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="enter your username"
                />

                <label htmlFor="email-create">email:</label>
                <input
                  type="email"
                  id="email-create"
                  placeholder="enter your email"
                />

                <label htmlFor="password-create">password:</label>
                <input
                  type="password"
                  id="password-create"
                  placeholder="create a password"
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

export default Login;
