import React from "react";
import "./Header.css";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header-logo">
        <a href="http://netflix.com/">
          <img src={require("../../images/netflix.png")} alt="netflix-log" />
        </a>
      </div>
      <div className="header-user">
        <a href="http://netflix.com/">
          <img src={require("../../images/user.png")} alt="user-logo" />
        </a>
      </div>
    </header>
  );
};
