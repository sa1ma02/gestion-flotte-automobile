import {
  FIND_VEHICULES_BY_CATEGORY_REQUEST,
  FIND_VEHICULES_BY_CATEGORY_SUCCESS,
  FIND_VEHICULES_BY_CATEGORY_FAILURE,
  FIND_VEHICULE_BY_ID_REQUEST,
  FIND_VEHICULE_BY_ID_SUCCESS,
  FIND_VEHICULE_BY_ID_FAILURE,
  CREATE_VEHICULE_REQUEST,
  CREATE_VEHICULE_SUCCESS,
  CREATE_VEHICULE_FAILURE,
  UPDATE_VEHICULE_REQUEST,
  UPDATE_VEHICULE_SUCCESS,
  UPDATE_VEHICULE_FAILURE,
  DELETE_VEHICULE_REQUEST,
  DELETE_VEHICULE_FAILURE,
  DELETE_VEHICULE_SUCCESS,
  FIND_ALL_VEHICULES_REQUEST,
  FIND_ALL_VEHICULES_SUCCESS,
  FIND_ALL_VEHICULES_FAILURE,

} from "./ActionType";

const initialState = {
  vehicules: [],
  vehicule: null,
  loading: false,
  error: null,
  deleteVehicule:null,
};

const customerVehiculeReducer = (state = initialState, action) => {
  switch (action.type) {

    case FIND_ALL_VEHICULES_REQUEST:
      return { ...state, loading: true, error: null, vehicules:[] };
    case FIND_ALL_VEHICULES_SUCCESS:
      return { ...state, vehicules: action.payload, loading: false };
    case FIND_ALL_VEHICULES_FAILURE:
      return { ...state, loading: false, error: action.payload, vehicules:[] };
    case FIND_VEHICULES_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null,vehicules:[] };
    case FIND_VEHICULES_BY_CATEGORY_SUCCESS:
      return { ...state, vehicules: action.payload, loading: false };
    case FIND_VEHICULES_BY_CATEGORY_FAILURE:
      return { ...state, loading: false, vehicules:[], error: action.payload };
    case FIND_VEHICULE_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_VEHICULE_BY_ID_SUCCESS:
      return { ...state, vehicule: action.payload, loading: false };
    case FIND_VEHICULE_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
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
            vehicule.id === action.payload.id ? action.payload : vehicule
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
        console.log("delete ",state.vehicules)
        return {
          ...state,
          loading: false,
          deleteVehicule:action.payload
          
          
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

export default customerVehiculeReducer;
