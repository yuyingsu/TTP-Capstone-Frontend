import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchBox } from "./";

function Header() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">
            {userInfo ? "Hello, " + userInfo.name : "Hello, Guest"}
          </span>
          <span className="header__optionLineTwo">
            {userInfo ? (
              <Link to="/profile">Account</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header-links">
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <a href="#">Admin</a>
              <ul className="dropdown-content">
                <li>
                  <Link to="/orders">Orders</Link>
                  <Link to="/products">Products</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="header__optionBasket">
          <Link to="/cart">
            <ShoppingBasketIcon />
          </Link>
          <span className="header__optionLineTwo header__basketCount">1</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
