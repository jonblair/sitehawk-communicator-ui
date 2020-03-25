import React from "react";
import LoginForm from "../../components/login-form/login-form";
import "./login-container.css";

export default function LoginContainer() {
  return (
    <div className="body">
      <div className="header">
        <div className="wrap">
            <a href="https://www.sphera.com/" target="_blank" rel="noopener noreferrer">
              <img id="ImgLogo" className="logo" src={require("../../images/Sphera RO.png")} alt="Sphera logo" />
            </a>
        </div>
      </div>
      <div id="main">
        <LoginForm />
      </div>
    </div>
  );
}
