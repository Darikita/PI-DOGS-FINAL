import React from "react";
import {Link} from "react-router-dom"
import s from './LandingPage.module.css'

export default function LandingPage(){
    return (
    <div className={s.conteiner}>
      <div className={s.div}>
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
            <button className={s.btn}>ENTER</button>
        </Link>
        </div>
    </div>
    )
}