import React from "react";
import LogoImg from "../assets/images/logo.PNG";


function Navbar() {

  return (
    <div className="nav">
      <div className="div-navbar-container">
        <div className="div-left-container">
          <a href="/">
            <img className="nav-logo" src={LogoImg} alt="Logo" />
          </a>
        </div>
        <div className="div-right-container">
          <div className="div-navbar-link-container">
            <a className="nav-link" href="/">
              Best Decks
            </a>

            <a className="nav-link" href="/composeNGram">
              Compose N-Gram
            </a>
            {/* <a className="nav-link" href="/all">
              All Cards
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;