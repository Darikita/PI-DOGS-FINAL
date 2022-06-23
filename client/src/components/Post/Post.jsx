import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postsDogstoBack} from '../../actions/actions';
//import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import i from'./Post.module.css'



function validate(input) { 
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
    //                     
  } 
/*   if(  input.length === 0) {
  errors.temp = 'At least one temperament is required';
  }  */
/* if(!input.temperaments.length) {
    errors.temperaments = 'At least one temperament is required';
  }  */
    return errors;
};

function validate2(input) {
 let error2 = {};
  if(!input.max) {
   error2.max ='Required'
  }
 if(!input.min) {
    error2.min ='Required'
   }

  return error2 
}
/* function val3(input) {
   let err = '';
 
 return err;
 } */
function Post() {

const dispatch = useDispatch();
const history = useHistory()
const [input, setInput] = useState({
    name: '',
    life_span:'',
    image:'',
   // createdindb: true,
 });
 const [temperaments, setTemperaments] = useState([])
 const [weight, setWeight] = useState({
     max:'',
     min:''
 })
 const [height, setHeight] = useState({
     max:'',
     min:''
})
const [errors, setErrors] = useState({})/* */
const [errors2, setErrors2] = useState({})
const [errHe, setErrHe] = useState({})

 useEffect(() => {
       dispatch(getTemperaments())        
  },[dispatch]);

let temp = useSelector((state) => state.temperaments);



  function handleChange(e) { 
  setInput({...input, 
    [e.target.name]: e.target.value});
 setErrors(validate({...input,[e.target.name]: e.target.value}));

}  
function handleWeight (e) { 
  setWeight({...weight, 
    [e.target.name]: e.target.value});
 setErrors2(validate2({...weight,[e.target.name]: e.target.value}));
}  
function handleHeight (e) { 
  setHeight({...height, 
    [e.target.name]: e.target.value});
 setErrHe(validate2({...height, [e.target.name]: e.target.value}))

}  
 function handleSelect(e){
  setTemperaments([ ...temperaments,e.target.value])

}


function handleTempDel(el) {
  setTemperaments(temperaments.filter(f => f !== el ))
} 
function handleSubmit(e) {
  e.preventDefault()
  if(!errors.name && !errors2.max && !errors2.min && !errHe.min && !errHe.max ) {
    const send = {
    ...input,
    weight: weight.min + ' - ' + weight.max,
    height: height.min + ' - ' + height.max,
    temperaments: temperaments
   }

   console.log(send)
   dispatch(postsDogstoBack(send))  
   alert("Dog created!!")
    setInput({
        name:"",
        life_span:'',
         image:'',
    })
    setWeight({
      max:'',
      min:''
   })
    setHeight({
      max:'',
      min:''
    })
    history.push('/home') 
  } 
  else {
  alert("Fill all require fields")

  }
} 
 /*  if(loading) {
      return <h2>Loading...</h2>
  } */

    return (
      

        <div className={i.byf}>
          <>
           <Link to='/home' >
            <button type='button' className={i.fill}> BACK </button>
            </Link>
     </>
        <div className={i.post}>
         <div clasName={i.contimg}>
           <img  src= "https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg" alt='img' />
            <h2 className = {i.t6}>Create your own dog</h2>
             </div> 

            <form  className= {i.form} onSubmit={(e)=>handleSubmit(e)}>
             <div className = {i.input}> 
             <label  className= {i.labels}>Name: </label> 
             <input
              className ={i.fields}
           /* className = {errors.name ? 'danger' : 'z1'} */
			        name='name'
              type= 'text'
			        value={input.name}
			    	  onChange={(e)=>handleChange(e)} 
			    	  placeholder='Name'
		         />
         {errors.name && (<p className={i.danger}>{errors.name}</p>)} 
           </div>
             
           <div className =  {i.input}>
           <label className= {i.labels}>Life span:</label> 
           <div>
              <input
                  className ={i.fieldsy}
                  type= 'text'
				          name='life_span'
				          value={input.life_span}
				          onChange={(e)=>handleChange(e)} 
			            placeholder='ex : 12 - 15 '
		            />
              <label className= {i.labels2}>years</label> </div>
             </div>

               <div className = {i.input}> 
               <label  className= {i.labels}>Weight:</label> 
               <label  className= {i.labels1}>min</label>
               <div>
               <input
                className ={i.fieldsm}
                 type= 'number'
			           name='min'
			    	     value={weight.min}
				         onChange={(e)=>handleWeight(e)} 
				         placeholder='min'
		         	   />
                <label className= {i.labels2}>kg</label> </div>
                {errors2.min &&(<p className={i.danger}>{errors2.min}</p>)} 

                <label className= {i.labels1}>max</label>
                <div>
               <input
                 className ={i.fieldsm}
                 type= 'number'
			           name='max'
			    	     value={weight.max}
				         onChange={(e)=>handleWeight(e)} 
				         placeholder='max'
		         	  /> 
                  <label className= {i.labels2}>kg</label> </div>
                {errors2.max &&(<p className={i.danger}>{errors2.max}</p>)} 
            </div>
            
            <div className = {i.input}> 
               <label className= {i.labels}>Height:</label> 
               <label className= {i.labels1}>min</label>
               <div>
               
               <input
                 className ={i.fieldsm}
                 type= 'number'
			           name='min'
			    	     value={height.min}
				         onChange={(e)=>handleHeight(e)} 
				         placeholder='min'
		         	   />
                   <label className= {i.labels2}>cm</label> </div>
                {errHe.min &&(<p className={i.danger}>{errHe.min}</p>)} 

                <label className= {i.labels1}>max</label>
              <div clasName= {i.rows}>
               <input
                 className ={i.fieldsm}
                 type= 'number'
			           name='max'
			    	     value={height.max}
				         onChange={(e)=>handleHeight(e)} 
				         placeholder='max'
		         	  />
                  <label className= {i.labels2}>cm</label> </div>
                {errHe.max &&(<p className={i.danger}>{errHe.max}</p>)} 
            </div>
            <div className =  {i.input}>
              <label className= {i.labels}>Choose Temperaments:</label>
              <select className={i.select1} onChange={(e) => handleSelect(e)}>
               {temp.map((o, i) => (
                   <option key ={i} value={o.name}>{o.name}</option>
                ))}
                </select>
               </div> 
      
              <div className={i.inTemp}>
                { temperaments.map(el => 
                
                  <div className={i.me}>
                    <p className={i.pp} key = {el}>{el}</p>
                    <button className= {i.bt} type='button' onClick ={()=>handleTempDel(el)} >x</button>
                 
                  </div>)}</div> 
              <div className =  {i.input}>
              <label className= {i.labels}>Image:</label> 
		     	    <input
               className ={i.fields}
			   	      name='image'
			          value={input.image}
			          onChange={(e)=>handleChange(e)}
			   	      placeholder='image'
			         />
          </div>
                 
            <button className={i.b} type="submit">send</button>  
		
          </form> 
         
      
         </div>
      </div>
    );
}
export default Post;  
/* ruta de creación de raza de perro: debe contener

[ ] Un formulario controlado con los siguientes campos
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro */