import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDogs, sortbyNames, sortbyWeight, filterByDb, getNames, getTemperaments, filterByTemperament } from '../../actions/actions';
import h from './Home.module.css';
import Card from '../Cards/Card';
import Paginated from '../paginated/Paginated';

function Home() {
 const [input, setInput]= useState('') 

 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(9);
 const [setOrden]= useState('');

 const dispatch = useDispatch()
 const dogies = useSelector ((state) => state.dogs)
 const temper = useSelector((state) => state.temperaments)

 useEffect (()=>{
    dispatch(getAllDogs());
    dispatch(getTemperaments())  
},[dispatch])

const indexOfLastPost = currentPage * postsPerPage;
const indexofFirstPost = indexOfLastPost - postsPerPage;
let currentPosts = dogies.slice(indexofFirstPost, indexOfLastPost);
const paginate = pageNumber => setCurrentPage(pageNumber);

function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs());
   // console.log(dogies)
}
function handleChange(e){
   e.preventDefault()
   setInput(e.target.value)
  }
 function  handleSubmit(e) {
   e.preventDefault();
    dispatch(getNames(input)); 
   setInput('')
 }

function handleSort (e){
   e.preventDefault();
   dispatch(sortbyNames(e.target.value))
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`)
}
function handlefilterweight(e) {
   e.preventDefault();
   dispatch(sortbyWeight(e.target.value))
   setCurrentPage(1);
   setOrden(`Ordenado ${e.target.value}`)
}
 function handleCreated(e) {
     dispatch(filterByDb(e.target.value))
  }

 function handleSelect(e){
   dispatch(filterByTemperament(e.target.value))
 }
  return(
     <div >
        <div className={h.big}>
         <h3>
            <span className = {h.hD1}>Dogs</span></h3>

       <div className ={h.searchAndButt} > 

           <Link to='/post'> 
         
              <button type="button" className={h.slide}>
             <div> Create your own dog</div>
          <i className="icon-arrow-right"></i> 
           </button>
             </Link>   
          
       <button className={h.fill} onClick={e=> {handleClick(e)}}>
               All dogs
           </button>
           <form  onSubmit={e => handleSubmit(e)} >
              <label className = {h.l1}>Search by name: </label>
             <input
              className= {h.i1}
               name='name'
               type= 'text'
               value={input}
               onChange={e =>handleChange(e)} 
               placeholder='name'
              />
             <button className ={h.b2} type="submit">Search</button> 
          </form> 

      </div> 
      <div className={h.div1}>
         <div>
         <label className={h.lab}>Order by name: </label>
         <select className={h.select1}  onChange={e => handleSort(e)} >
             <option value= 'asc'>a-z</option>
             <option value= 'desc'>z-a</option>
         </select>
          </div>
          <div>
         <label className={h.lab}>Order by weight: </label>
          <select className={h.select1}  onChange= {e=> handlefilterweight(e)} >
            <option value= 'asc'>asc</option>
            <option value= 'desc'>desc</option>
        </select>
          </div>
          <div>
        <label className={h.lab}> Created: </label>
          <select className={h.select1} onChange= {e=> handleCreated(e)} >
            <option value='All'>All</option>
            <option value= 'created'>Created</option>
            <option value='api'>Existing</option>
         </select> 
         </div>
         <div>
        <label  className={h.lab}>Find dog by Temperament:  </label>
            <select className={h.select2}  onChange={(e) => handleSelect(e)} >
            <option key ={596} value={'...'}>...</option>
             {temper.map((o, i) => (
             <option key ={i} value={o.name}>{o.name}</option>
             ))}
         </select>
         </div>
      </div>
         <div className = {h.all}>
          <ul className= {h.displayCards}>
             {currentPosts?.map(p => (
               <li className = 'lis1' key={p.id}>
                  <div className = 'name1'>
                   <Card  name ={p.name} image = {p.image} temperaments ={p.temperaments} id = {p.id} />  
                   </div>
                </li>
               ))}
            </ul>
          </div>
               </div>
               <div className={h.paginatedDiv}>
       <Paginated postsPerPage ={postsPerPage} totalPosts = {dogies.length} paginate={paginate}/> 
      </div>
</div>
    
  );
}


export default Home;
/* Ruta principal: debe contener

[ ] Input de búsqueda para encontrar razas de perros por nombre
[ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
[ ] Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por orden alfabético y por peso
[ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 9 razas inicialmente en la página uno. */