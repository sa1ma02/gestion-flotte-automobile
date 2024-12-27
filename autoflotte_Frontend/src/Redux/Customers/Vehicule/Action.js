import axios from "axios";

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
  DELETE_VEHICULE_SUCCESS,
  DELETE_VEHICULE_FAILURE,
  FIND_ALL_VEHICULES_REQUEST,
  FIND_ALL_VEHICULES_SUCCESS,
  FIND_ALL_VEHICULES_FAILURE,
  ORDER_VEHICULE_REQUEST,
  ORDER_VEHICULE_SUCCESS,
  ORDER_VEHICULE_FAILURE,
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

export const findVehicules = (reqData) => async (dispatch) => {
  const { categoryName, statut, pageNumber, pageSize } = reqData;

  try {
    // Check if both filters are empty, if yes, call findAllVehicules instead
    if (!categoryName && !statut) {
      return dispatch(findAllVehicules());
    }

    dispatch({ type: FIND_VEHICULES_BY_CATEGORY_REQUEST });

    // Construct the query parameters for the API request
    const queryParams = new URLSearchParams({
      categoryName: categoryName || '',
      statut: statut || '',
      pageNumber: pageNumber || 0,
      pageSize: pageSize || 10,
    }).toString();

    const { data } = await api.get(`/api/vehicules?${queryParams}`);
    
    // Extract the vehicles from the 'content' field in the response
    const vehiculesData = data.content || [];
    
    console.log("Response from API: ", vehiculesData);

    dispatch({
      type: FIND_VEHICULES_BY_CATEGORY_SUCCESS,
      payload: vehiculesData,
    });
  } catch (error) {
    dispatch({
      type: FIND_VEHICULES_BY_CATEGORY_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const findAllVehicules = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_ALL_VEHICULES_REQUEST });

    const { data } = await api.get(`/api/admin/vehicules/all`);

    console.log("get all vehicules - ", data);
    dispatch({
      type: FIND_ALL_VEHICULES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_ALL_VEHICULES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findVehiculeById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_VEHICULE_BY_ID_REQUEST });

    const { data } = await api.get(`/api/vehicules/id/${reqData.vehiculeId}`);

    console.log("vehicules by  id : ", data);
    dispatch({
      type: FIND_VEHICULE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_VEHICULE_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderVehicule = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_VEHICULE_REQUEST });

    const { data } = await api.post(`/api/orders`, orderData);

    dispatch({
      type: ORDER_VEHICULE_SUCCESS,
      payload: data,
    });

    console.log("Vehicle ordered successfully: ", data);
  } catch (error) {
    dispatch({
      type: ORDER_VEHICULE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVehicule = (vehicule) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_VEHICULE_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/vehicules/`,
      vehicule.data
    );

    dispatch({
      type: CREATE_VEHICULE_SUCCESS,
      payload: data,
    });

    console.log("created vehicule ", data);
  } catch (error) {
    dispatch({
      type: CREATE_VEHICULE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateVehicule = (vehicule) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VEHICULE_REQUEST });

    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/vehicules/${vehicule.vehiculeId}/update`,
      vehicule
    );

    dispatch({
      type: UPDATE_VEHICULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VEHICULE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteVehicule = (vehiculeId) => async (dispatch) => {
  console.log("delete vehicule action",vehiculeId)
  try {
    dispatch({ type: DELETE_VEHICULE_REQUEST });

    let {data}=await api.delete(`/api/admin/vehicules/${vehiculeId}/delete`);

    dispatch({
      type: DELETE_VEHICULE_SUCCESS,
      payload: data,
    });

    console.log("vehicule deleted ",data)
  } catch (error) {
    console.log("catch error ",error)
    dispatch({
      type: DELETE_VEHICULE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
