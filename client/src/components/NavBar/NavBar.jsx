import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "../LandingPage/dogs-logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { fetchDogs } from "../../Redux/actions";
import { useDispatch } from "react-redux";


export default function NavBar() {
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchDogs());
  }
  return (
    <header className={styles.container}>
      <SearchBar></SearchBar>
      <button onClick={(e) => handleClick(e)}>
       <span class= {styles.buttonContent}>
       <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" fill="currentColor"></path></svg> 
      </span>
      </button>
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
