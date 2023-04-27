import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import Incident from "../project/Project";

const Home = () => {
  const [logUser, removeLogUser] = useCookies(["fname"]);
  // const [token, removeToken] = useCookies(["loginToken"]);
  let history = useHistory();

  const logout = () => {
    // This is still not working. The logout button only causes the cookie value to turn into undefined.
    // removeToken("loginToken");
    // removeLogUser("fname");

    // This is such an old school vanilla javascript type. Please find the React way to do this haha :)
    document.cookie =
      "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    history.push("/");
    history.go("/");
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting("Hello, ");
  }, []);

  return (
    <div className="container" style={{ padding: "0 0 5em" }}>
      <div
        className="header text-white d-flex align-items-center justify-content-between"
        style={{ marginTop: "5em" }}
      >
        <div className="text-wrapper">
          <h1>{greeting} {logUser["fname"]}</h1>
        </div>
        <div className="logout-wrapper">
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>

      <Incident />
    </div>
  );
};

export default Home;
