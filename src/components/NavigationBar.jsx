import React, { Component } from "react";
import NavBarCss from "../css/NavBarCss.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Game from "./Game.jsx";

class NavigationBar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="navbar">
          <a href="#">Home</a>
          <a href="#">Latest</a>
          <a href="#">Trending</a>
          <a href="#">Popular</a>
          <a href="#">Deals</a>
          <div className="account">
            <a href="#">Log in</a>
            <a href="#">Create Account</a>
            <a href="#">Shopping Cart</a>
          </div>

          <div class="dropdown">
            <a href="#" style={{ backgroundColor: "#333" }}>
              Account
            </a>
            <div class="dropdown-content">
              <a href="#">Account Details</a>
              <a href="#">Order Hisotry</a>
              <a href="#">Favorites</a>
              <a href="#">Wish List</a>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default NavigationBar;
