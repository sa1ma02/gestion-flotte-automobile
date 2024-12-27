import axios from "axios";
import {
  GET_VEHICULES_REQUEST,
  GET_VEHICULES_SUCCESS,
  GET_VEHICULES_FAILURE,
  CREATE_VEHICULE_REQUEST,
  CREATE_VEHICULE_SUCCESS,
  CREATE_VEHICULE_FAILURE,
  UPDATE_VEHICULE_REQUEST,
  UPDATE_VEHICULE_SUCCESS,
  UPDATE_VEHICULE_FAILURE,
  DELETE_VEHICULE_REQUEST,
  DELETE_VEHICULE_SUCCESS,
  DELETE_VEHICULE_FAILURE,
} from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";

export const getVehicules = () => async (dispatch) => {
  try {
    dispatch({ type: GET_VEHICULES_REQUEST });

    const { data } = await api.get(`${API_BASE_URL}/api/admin/vehicules/`);

    dispatch({
      type: GET_VEHICULES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_VEHICULES_FAILURE,
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
      `${API_BASE_URL}/api/admin/vehicules/${vehicule.vehiculeId}`,
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

export const deleteVehicule = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VEHICULE_REQUEST });

    await api.delete(`/api/admin/vehicules/${data.vehiculeId}`);

    dispatch({
      type: DELETE_VEHICULE_SUCCESS,
      payload: data.vehiculeId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VEHICULE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
