import React from 'react';
import style from './Card.module.css'
import {Link} from 'react-router-dom'

function Card ({ name, image, weight, height, temperaments, id}) {
 return (
    <>
        <div className = {style.card}>
          <img className ={style.pic} src={image ? image :'https://wallpaperaccess.com/full/266770.jpg'} alt={"img"}/> 
             <Link to={`/perro/${id}`}>
                 <h3 className ={style.titleName} >{name}</h3>  
             </Link>
             <h5>Peso:{height} kg.</h5>
             <div className={ style.temp }>                                              
                    <p>Temperamento:{temperaments.map( elem => elem + ' * ') 
                        }
                    </p> 
                
                                           
            </div>  
        </div>
     </>
   
 )
}

export default Card