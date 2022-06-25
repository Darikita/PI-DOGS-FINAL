import { ASCENDENTE } from "../../constantes/sort";
import {
  FETCH_DOGS,
  FETCH_TEMPERAMENTS,
  FILTER_TEMPERAMENT,
  SEARCH_DOGS,
  SORT,
  SORT_WEIGHT,
} from "../../Redux/actions";

const initialState = {
  dogs: [],
  filteredDogs: [],
  temperaments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOGS:
      return {
        ...state,
        dogs: action.payload,
        filteredDogs: action.payload,
      };
    case FETCH_TEMPERAMENTS:
      const temperaments = action.payload.map((temp) => temp.name);

      return {
        ...state,
        temperaments,
      };
    case SEARCH_DOGS:
      return {
        ...state,
        filteredDogs: action.payload,
      };
    case SORT:
      let orderedDogs = [...state.filteredDogs];

      orderedDogs = orderedDogs.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === ASCENDENTE ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === ASCENDENTE ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredDogs: orderedDogs,
      };
    case SORT_WEIGHT:
      return {
        ...state,

        filteredDogs: action.payload,
      };
    case FILTER_TEMPERAMENT:
      return {
        ...state,

        filteredDogs: action.payload,
      };

    default:
      return state;
  }
}
