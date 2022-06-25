
import { GET_DOGS, FILTER_SORTNAME, SORTBY_WEIGHT, FILTER_CREATED, GET_NAMES,TEMPERAMENT_TYPES, POST_DOGS, GET_DETAIL, FILTER_TEMPERAMENT, PRUEBA } from "../actions/actions";
import { filDogies } from './functions.js'

const initialState = {
    charaDeatil:{},
     dogs:[], //renderizada
     allDogs:[], // copia
     temperaments:[],
     deteail:[],
     
     prueba1:[]
  };
  

function rootReducer(state= initialState, action){
   switch(action.type) {
     case GET_DOGS: return {
           ...state, 
            dogs: action.payload, 
           allDogs:action.payload
              
       }
      case FILTER_SORTNAME:
          const sorts = (str, arr) => {
             if(str === 'asc') {
                 return arr.sort((unaMascota, otraMascota) => unaMascota.name.localeCompare(otraMascota.name))
               }
             if(str === 'desc') {
                return arr.sort((unaMascota, otraMascota) => otraMascota.name.localeCompare(unaMascota.name))    
               }
            };
            return {
               ...state,
                dogs: sorts(action.payload, state.dogs)
             }

         case SORTBY_WEIGHT:
            const sorts2 = (str, arr) => {
                 if(str === 'desc') {//mayor a men
                    return arr.sort((unaMascota, otraMascota) => otraMascota.weight[1] - unaMascota.weight[1]);
                 }
                 if(str === 'asc') { //men a may
                   return arr.sort((unaMascota, otraMascota) => unaMascota.weight[1] - otraMascota.weight[1]);  
                    }
                 };
              return {
                   ...state,
                    dogs: sorts2(action.payload, state.dogs)
                 } 
               
          case FILTER_CREATED:
            const created = action.payload === 'created' ? state.allDogs.filter(el => el.createdindb) : state.allDogs.filter(el => !el.createdindb)
             return {
              ...state,
                dogs: action.payload === 'All' ? state.allDogs : created.length ? created : [{name : 'Dog does not exist'}]
            }
       
          case GET_NAMES: return {
                  ...state, 
                 dogs: action.payload,        
             }          
         case TEMPERAMENT_TYPES: 
             return {
                 ...state,
                 temperaments: action.payload 
          } 
         case POST_DOGS: 
              return {
              ...state,
           }

         case GET_DETAIL: 
          return {
              ...state,
              deteail: action.payload 
         }  
         case FILTER_TEMPERAMENT:
         // const allD = state.allDogs
          return {
              ...state,
              dogs: action.payload === '...' ? state.allDogs : filDogies(action.payload, state.allDogs)
          }
          case PRUEBA: 
           return {
              ...state,
              prueba1:action.payload
           }
            default: 
           return state;
   }
}

export default rootReducer;