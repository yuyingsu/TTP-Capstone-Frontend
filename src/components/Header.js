import React, { useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBox } from './'
import { Dropdown, Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.ct.carts);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleLogout = () => {
    dispatch(logout());
    //props.history.push("/signin");
  }

  //console.log("props" + props)
  return (
    <div className="header">

        <Link to="/"><img
          className="header__logo"
          src="/logo2.png"
        /></Link>


      <SearchBox />

      <div className="header__nav">
          <div className="header__option">
            <span className="header__optionLineOne">{userInfo ? (
              "Hello, " + userInfo.name
            ) : (
              "Hello, Guest"
            )}</span>
            <span className="header__optionLineTwo">{userInfo ?
            (
              userInfo.isAdmin ?

              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                style={{color:"#eb6864", cursor:"pointer"}}
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
              >
                Control Panel
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem tag={Link} to="/profile">Profile</DropdownItem>
                <DropdownItem tag={Link} to="/orders">Orders</DropdownItem>
                <DropdownItem tag={Link} to="/products">Products</DropdownItem>
                <DropdownItem onClick={handleLogout} >Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            :
              <Link to="/profile">Account</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}</span>
          </div>



          <div className="header__option">
           <span className="header__optionLineOne">Returns</span>
           {userInfo ?
           <span className="header__optionLineTwo"><Link to="/myorders">& Orders</Link></span>
           :
            <span className="header__optionLineTwo">& Orders</span>
           }
          </div>

          <div className="header__optionBasket">
          <Link to="/cart"><ShoppingBasketIcon /></Link>
            <span className="header__optionLineTwo header__basketCount">
              {cartItems.length && cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          </div>

      </div>
    </div>
  );
}

export default Header;

