import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "../LandingPage/dogs-logo.png";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <header className={styles.container}>
      <SearchBar></SearchBar>
      <NavLink className={styles.navLogo} to="/home">
        <li>
          <img className={styles.logo} src={Logo} alt="" />
        </li>
      </NavLink>
      <nav className={styles.navBar}>
        <ul className={styles.unl}>
          <div className={styles.navLinks}>
            <NavLink to="/add">
            <button>
               CREATE YOUR DOG 
            </button>
            </NavLink>
          </div>
        </ul>
      </nav>
    </header>
  );
}
