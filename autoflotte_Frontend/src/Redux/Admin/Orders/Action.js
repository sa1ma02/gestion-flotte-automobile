
import api from "../../../config/api";
import {
  canceledOrderFailure,
  canceledOrderRequest,
  canceledOrderSuccess,
  confirmedOrderFailure,
  confirmedOrderRequest,
  confirmedOrderSuccess,
  deleteOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  rejectedOrderFailure,
  rejectedOrderRequest,
  rejectedOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  placedOrderFailure,
  placedOrderRequest,
  placedOrderSuccess
} from "./ActionCreator";
import { updateVehicule } from "../Vehicule/Action"; // Adjust the path as needed


export const getOrders = (reqData) => {
  console.log("get all orders ", reqData);
  return async (dispatch) => {
    dispatch(getOrdersRequest());
    try {
     
      const response = await api.get(`/api/admin/orders/`);
      console.log("get all orders ", response.data);
      dispatch(getOrdersSuccess(response.data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(getOrdersFailure(error.message));
    }
  };
};

export const confirmOrder = (orderId, vehiculeId) => async (dispatch) => {
  dispatch(confirmedOrderRequest());

  try {
    // Confirm the order
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);
    const data = response.data;
    console.log("confirm_order", data);
    dispatch(confirmedOrderSuccess(data));

    // Update the vehicule to set assigne to 'OUI'
    const updatedVehicule = {
      vehiculeId: vehiculeId, // Use the correct vehicle ID associated with the order
      assigne: 'OUI'
    };
    dispatch(updateVehicule(updatedVehicule)); // Dispatch the action to update the vehicle
  } catch (error) {
    dispatch(confirmedOrderFailure(error.message));
  }
};




export const rejectOrder = (orderId) => async (dispatch) => {
  dispatch(rejectedOrderRequest());

  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/reject`
    );
    const data = response.data;
    console.log("rejecteded order ",data)
    dispatch(rejectedOrderSuccess(data));
  } catch (error) {
    dispatch(rejectedOrderFailure(error.message));
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch(canceledOrderRequest());

  try {
    const response = await api.put(
      `/api/admin/orders/${orderId}/cancel`
    );
    const data = response.data;
    dispatch(canceledOrderSuccess(data));
  } catch (error) {
    dispatch(canceledOrderFailure(error.message));
  }
};


export const deleteOrder = (orderId) => {
  return async(dispatch) => {
    dispatch(deleteOrderRequest());     
   try {
     const {data} = await api.delete(`/api/admin/orders/${orderId}/delete`);
     console.log("delete order ",data)
     dispatch(deleteOrderSuccess(orderId));
   } catch (error) {
    console.log("catch error ",error)
     dispatch(deleteOrderFailure(error));
   }
      
  };
};

export const placeOrder = (order) => async (dispatch) => {
  dispatch(placedOrderRequest());

  try {
    const response = await api.post(`/api/admin/orders/`, order);
    const data = response.data;
    dispatch(placedOrderSuccess(data));
  } catch (error) {
    dispatch(placedOrderFailure(error.message));
  }
};
