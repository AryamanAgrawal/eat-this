import React, { useState } from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine, RiFileTransferLine } from 'react-icons/ri';
import logo from '../assets/logo.svg';

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// import MediaQuery for mobile-responsive;
import { useMediaQuery } from 'react-responsive';


// Here, we display our Navbar
export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    const isRetina = useMediaQuery({ minResolution: '2dppx' })

    //Menu one the Navbar
    const Menu = () => (
        <>
            <NavLink className="nav-item" to="/">Home</NavLink>
            <NavLink className="nav-item" to="/dining">Dining</NavLink>
            <NavLink className="nav-item" to="/user">User</NavLink>
        </>
    )

    const DesktopNav = () => (
        <>
            <Menu />
            <NavLink className="nav-item" to="/login"><button className="login" type="button">Log in</button></NavLink>
            <NavLink className="nav-item" to="/signup"><button className="signup" type="button">Sign up</button></NavLink>
        </>
    )

    const NavMenu = () => (
        <>
            <div className="main__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <div className="main__navbar-menu_container scale-up-center">
                        <div className="main__navbar-menu_container-links">
                            <Menu />
                            <NavLink className="nav-item" to="/login"><button className="login" type="button">Log in</button></NavLink>
                            <NavLink className="nav-item" to="/signup"><button className="signup" type="button">Sign up</button></NavLink>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img alt="Logo" style={{ "width": 25 + '%' }} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Create Record
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="main__navbar">
                <div className="main__navbar-links">
                    <div className="main__navbar-links_logo">
                        {/* need to change to our logo */}
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='main__navbar-links_container'>
                        {isDesktopOrLaptop ? <DesktopNav /> : <NavMenu />}
                    </div>
                </div>
            </div>
        </div>
    );
}