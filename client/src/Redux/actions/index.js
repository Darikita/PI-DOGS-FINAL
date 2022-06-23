import axios from 'axios';

export function getAllDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch ({
        type: 'GET_DOGS',
        payload: json.data    
        })
    }
}
// export function getBreeds() {
//     return function (dispatch) {
  
//       return axios.get("/dogs")
//         .then(response => response.data)
//         .then(json => {
//           dispatch({ type: GET_BREEDS, payload: json });
//         });
//     };
//   }