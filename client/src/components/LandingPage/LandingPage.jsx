import React from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(){
  return (
  <div className={styles.conteiner}>
    <div className={styles.div}>
      <h4>
        <span>P</span>
        <span>I</span>
        <span>-</span>
        <span>D</span>
        <span>O</span>
        <span>G</span>
        <span>S</span>
        <span>!</span>
        </h4> 
      <Link to="/home">
          <button className={styles.btn}>ENTER</button>
      </Link>
      </div>
  </div>
  )
}
