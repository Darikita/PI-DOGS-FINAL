import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetails, getClear } from '../../actions/actions';
import a from './detail.module.css'

import { NavLink, useParams  } from 'react-router-dom';

function Detail () {

 const {id} = useParams()  
 const dispatch = useDispatch();

   useEffect(() => {  
    dispatch(getDogDetails(id))  
    return () => dispatch(getClear())
  
  },[id, dispatch]);

 const dog = useSelector((state) => state.deteail);
   
 console.log(dog)
 
  return (
    <div className = 'recipe1'>
       
      { typeof dog === 'string'? <h1>{dog}</h1> : dog.length === 1 ? 
         <div> 
      
        <NavLink to='/home' >
          <button className = {a.fill}> BACK</button>
         </NavLink>

         <div className ={a.byna}>
         <h2 className ={a.name}>{dog[0].name}</h2> 
      
       <div className ={a.post}>
        <img className={a.pic2}  src={dog[0].image ? dog[0].image :'https://t1.uc.ltmcdn.com/images/7/6/6/img_como_dibujar_un_perro_adorable_38667_600.jpg'} alt="img"/> 

        {dog[0].life_span ? <h5 className = {a.title1}>Life span: {dog[0].life_span}</h5> : <></> } 
         <div className={a.cont}> 
        {dog[0].height ?<div>
           <h5  className = {a.title}>Height</h5>
            <p className = {a.ti}>min: {dog[0].height[0]} cm</p>
            <p className = {a.ti}>max: {dog[0].height[1]} cm</p>
        </div> : <p>Height not defined</p>} 

        {dog[0].weight ?<div>
           <h5  className = {a.title}>Weight</h5>
            <p className = {a.ti}>min: {dog[0].weight[0]} kg</p>
            <p className = {a.ti}>max: {dog[0].weight[1]} kg</p>
        </div> : <p>Weight not defined</p>} 
           </div>
      
           <h5  className = {a.title2}>Temperamets:</h5>
              <ul className = {a.ti2}>
             {dog[0].temperaments.length? dog[0].temperaments?.map((f,i) =>(f.name ? <p key = {i}>{f.name}</p>: <li className = {a.title3} key ={i}>{f}</li>)): <p>Temperaments not defined</p>}  
             </ul>
         
         </div> 
         </div> 
       </div> 
      : <div> 
         <h1 className= {a.loading}> Loading ...</h1>
         </div> }
   
    
  </div>
   ); 
}

export default Detail