import React from 'react';
import  StyledLanding  from '../styles/StyledLanding';
import { NavLink } from 'react-router-dom';

export default function Landing() {

    return (
        <StyledLanding>
            <div className='container'>
                <h1>PI-Dogs</h1>
                <NavLink exact to="/home">Enter</NavLink>
            </div>

        </StyledLanding>
    )
}