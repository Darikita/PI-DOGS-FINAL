import axios from "axios";

export const GET_DOGS = 'GET_DOGS';
export const FILTER_SORTNAME = 'FILTER_SORTNAME';
export const SORTBY_WEIGHT = 'SORTBY_WEIGHT';
export const FILTER_CREATED = 'FILTER_CREATED';
export const GET_NAMES = 'GET_NAMES';
export const TEMPERAMENT_TYPES = 'TEMPERAMENT_TYPES';
export const POST_DOGS = 'POST_DOGS'
export const GET_DETAIL ='GET_DETAIL';
export const FILTER_TEMPERAMENT ='FILTER_TEMPERAMENT';

export const PRUEBA = 'PRUEBA';
/* 
export function getAlldogsAsyncAawit() {
    return (dispatch)=> {
  axios.get("http://localhost:3001/temperament").then((response) => {
    dispatch({type: PRUEBA, payload:response.data })
  }) 
    }
} */

export  function getAllDogs() {
    return (dispatch) => {
       axios.get('/dogs').then((response) => {
      dispatch({type: GET_DOGS, payload: response.data});     
      })
      .catch(error => {
        console.log(error)
      }) 
     }
}
export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("/temperament", {
           }); 
           return dispatch({type: TEMPERAMENT_TYPES, payload:json.data});
        }   
};

 export function sortbyNames(order) {
    return {
        type: FILTER_SORTNAME,
        payload: order
    }
} 

export function sortbyWeight(order) {
    return {
        type: SORTBY_WEIGHT,
        payload: order
    }
}
export function filterByDb(value) {
    return { type:FILTER_CREATED, 
             payload:value }
}
  export function getNames(name) {
   
       return (dispatch) => {
       return axios.get("/dogs?name="+name)
       .then((response) => {
                dispatch({ type: GET_NAMES, payload:response.data });
            })

       .catch(error => {
         if(error.response?.status) {
            
             if(error.response.status === 400) {
                 return dispatch({type: GET_NAMES, payload:[{name:'Dog does not exist'}]})
             }
         } 
       })
    }
 };

export function postsDogstoBack(value) {
    return async function(dispatch) {
     try{ const response= await axios.post('/dogs', value)
          return response 
    }  catch(error) {
        console.log(error)
      }
    }
}
export  function getDogDetails(id) {
    return (dispatch) => {
       axios.get('/dogs/'+id).then((response) => {
       // console.log(response)
      dispatch({type: GET_DETAIL, payload: response.data});     
      })
      .catch(error => {
        if(error.response?.status) {
           
            if(error.response.status === 400) {
                return dispatch({type: GET_DETAIL, payload:'Dog does not exist'})
            }
        } 
      })
     };
    }
/* export function getAlldogsAsyncAawit(id) {
        return async function(dispatch) {
       var response = await axios.get('http://localhost:3001/dogs/'+id, {   
        });
         return dispatch({type:PRUEBA, payload:response.data})
        }
    } */
 
  export function getClear() {
    return {
        type: GET_DETAIL, payload: []
    }
}

export function filterByTemperament(value) {
    return { type:FILTER_TEMPERAMENT, 
             payload:value }
}

  