import React, { Component } from "react";
import "../stylesheets/NavbarStyle.css";
import "../index.css";
import { NavLink } from "react-router-dom";
// import AuthPopup from "../components/form_components/AuthPopUp";

class Navbar extends Component {
  state = { clicked: false, isLoggedIn: false, showPopup: false };

  setShowPopup = (value) => {
    this.setState({ showPopup: value });
  };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { isLoggedIn, showPopup } = this.state;

    return (
      <>
        <nav>
          {/* <NavLink to="/">
            <img src="/images/logo.png" alt="DocApoint" width={100} />
          </NavLink> */}

          <div>
            <ul
              id="navbar"
              className={this.state.clicked ? "#navbar active" : "#navbar"}
            >
              {/* Close Button */}
              <div onClick={this.handleClick} className="close-btn">
                <div id="mobile" onClick={this.handleClick}>
                  <i id="bar" className="fas fa-times"></i>
                </div>
              </div>

              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/exercise">Exercises</NavLink>
              </li>
              <li>
                <NavLink to="/diet">Diet</NavLink>
              </li>
              <li>
                <NavLink to="/prevention">Preventions</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>

              <NavLink to="/register" className="btn-style">
                Sign Up
              </NavLink>

            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className="fas fa-bars"></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;


// import React, { useState, useEffect } from 'react';
// // import logo from '@/assets/logo.png';
// import { IoIosBody } from 'react-icons/io';
// import './Navbar.css';
// import AuthPopup from '../components/form_components/AuthPopUp';

// const Navbar = () => {
//     const [isloggedin, setIsloggedin] = useState(false);
//     const [showpopup, setShowpopup] = useState(false);

//     const checklogin = async () => {
//         fetch(process.env.REACT_APP_BACKEND_API + '/auth/checklogin', {
//             method: 'POST',
//             credentials: 'include',
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             setIsloggedin(data.ok);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     };

//     useEffect(() => {
//         checklogin();
//     }, [showpopup]);

//     return (
//         <nav>
//             {/* <img src={logo} alt="Logo" /> */}
//             <a href='/'>Home</a>
//             <a href='/about'>About</a>
//             <a href='/profile'><IoIosBody /></a>
//             {isloggedin ? (
//                 <button>Logout</button>
//             ) : (
//                 <button onClick={() => setShowpopup(true)}>Login</button>
//             )}
//             {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
//         </nav>
//     );
// };

// export default Navbar;
