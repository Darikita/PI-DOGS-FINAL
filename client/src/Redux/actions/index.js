import axios from "axios";
// import { bindActionCreators } from "redux";
export const FETCH_DOGS = "FETCH_DOGS";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const SORT = "SORT";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FETCH_TEMPERAMENTS = "FETCH_TEMPERAMENTS";
export const POST_DOG = "POST_DOG"



export function fetchDogs() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dogs")
      .then((dogs) => {
        const data = dogs.data.map((dog) => {
          let temperament = dog.temperament;
          if (!temperament && dog.temperaments) {
            temperament = dog.temperaments.map((temp) => {
              return temp.name;
            });
          }
          return {
            ...dog,
            temperament,
          };
        });
        dispatch({
          type: FETCH_DOGS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchTemperaments() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/temperaments")
      .then((temperaments) => {
        dispatch({
          type: FETCH_TEMPERAMENTS,
          payload: temperaments.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchDogs(name) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dogs?name=" + name)
      .then((dogs) => {
        const data = dogs.data.map((dog) => {
          let temperament = dog.temperament;
          if (!temperament && dog.temperaments) {
            temperament = dog.temperaments.map((temp) => {
              return temp.name;
            });
          }
          return {
            ...dog,
            temperament,
          };
        });
        dispatch({
          type: SEARCH_DOGS,
          payload: data,
        });
      })
      .catch(() => {
        alert("⛔Dog not found!⛔")
      });
  };
}

export function sort(order) {
  return {
    type: SORT,
    payload: order,
  };
}

export function sort_weight(order) {
  return {
    type: SORT_WEIGHT,
    payload: order,
  };
}

export function filterTemps(temperament) {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
}

export function postDog(payload){
  return async function(dispatch){
      const respuesta = await axios.post("http://localhost:3001/dogs/new", payload);
      // const rjson = await respuesta.json();
      return dispatch({
          type: POST_DOG,
          payload: respuesta.data
      });
  }
}