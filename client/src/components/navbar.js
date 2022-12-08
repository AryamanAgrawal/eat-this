import React, { useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo.png";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import Tour from "./tour";


// import MediaQuery for mobile-responsive;
import { useMediaQuery } from "react-responsive";

// Here, we display our Navbar
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  //Menu one the Navbar
  const Menu = () => (
    <>
      <NavLink className="nav-item home" to="/">
        Home
      </NavLink>
      <NavLink className="nav-item dining" to="/diningPage">
        Dining
      </NavLink>
      <NavLink className="nav-item user" to="/userPage">
        User
      </NavLink>
      <Tour/>

    </>
  );

  const Logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const DesktopNav = () => (
    <>
      <Menu />
      {localStorage.getItem("token") ? (
        <div className="nav-item">
          <button className="login" type="button" onClick={Logout}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <NavLink className="nav-item" to="/loginPage">
            <button className="login" type="button">
              Log in
            </button>
          </NavLink>
          <NavLink className="nav-item sign" to="/signupPage">
            <button className="signup" type="button">
              Sign up
            </button>
          </NavLink>
        </>
      )}
    </>
  );

  const NavMenu = () => (
    <>
      <div className="main__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="main__navbar-menu_container scale-up-center">
            <div className="main__navbar-menu_container-links">
              <Menu />
              {localStorage.getItem("token") ? (
                <div className="nav-item">
                  <button className="login" type="button" onClick={Logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <NavLink className="nav-item" to="/loginPage">
                    <button className="login" type="button">
                      Log in
                    </button>
                  </NavLink>
                  <NavLink className="nav-item" to="/signupPage">
                    <button className="signup" type="button">
                      Sign up
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div>
      <div className="main__navbar">
        <div className="main__navbar-links">
          <div className="main__navbar-links_logo">
            <a href="/"><img src={logo} alt="logo" /></a>
            <a href="/"><h1>Eat This!</h1></a>
          </div>
          <div className="main__navbar-links_container">
            {(isDesktopOrLaptop || isBigScreen) && <DesktopNav />}
            {(isTabletOrMobile || isPortrait) && <NavMenu />}
          </div>
        </div>
      </div>
    </div>
  );
}
