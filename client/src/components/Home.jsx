import react from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getAllDogs } from '../Redux/actions';
import {Link} from 'react-router-dom';

function Home (){
  const dispatch = useDispatch ()
  const dogies = useSelector ((state) => state.dogs)
   useEffect (()=>{
    dispatch(getAllDogs());
    dispatch(getTemperaments())  
  },[dispatch])

function handleClick(e){
  e.preventDefault();
  dispatch(getAllDogs());
}
return(
  <div>
    <Link to ='/dog'>Create a new dog!</Link>
    <H1>DOGS</H1>
    <button onClick={e=> {handleClick(e)}}>
      All Dogs
    </button>
    <select>
      <option value = 'asc'>Ascendent</option>
      <option value = 'desc'> Descendent</option>
    </select>
    <select onChange= {e=> handleCreated(e)}>
          <option value='All'>Todos</option>
          <option value= 'created'>Creados</option>
          <option value='api'>Existente</option>
      </select> 
  </div>
)

}
export default Home;