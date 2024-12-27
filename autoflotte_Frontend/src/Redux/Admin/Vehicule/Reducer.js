import {
  GET_VEHICULES_REQUEST,
  GET_VEHICULES_SUCCESS,
  GET_VEHICULES_FAILURE,
  CREATE_VEHICULE_REQUEST,
  CREATE_VEHICULE_SUCCESS,
  CREATE_VEHICULE_FAILURE,
  UPDATE_VEHICULE_SUCCESS,
  UPDATE_VEHICULE_FAILURE,
  DELETE_VEHICULE_REQUEST,
  DELETE_VEHICULE_SUCCESS,
  DELETE_VEHICULE_FAILURE,
} from "./ActionType";
import { UPDATE_VEHICULE_REQUEST } from "./ActionType";

const initialState = {
  vehicules: [],
  loading: false,
  error: null,
};

const vehiculeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICULES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_VEHICULES_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicules: action.payload,
      };
    case GET_VEHICULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_VEHICULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_VEHICULE_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicules: [...state.vehicules, action.payload],
      };
    case CREATE_VEHICULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_VEHICULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_VEHICULE_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicules: state.vehicules.map((vehicule) =>
          vehicule._id === action.payload._id ? action.payload : vehicule
        ),
      };
    case UPDATE_VEHICULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VEHICULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_VEHICULE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (vehicule) => vehicule._id !== action.payload
        ),
      };
    case DELETE_VEHICULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default vehiculeReducer;
