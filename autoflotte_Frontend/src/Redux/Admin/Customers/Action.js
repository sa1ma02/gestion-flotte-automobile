
import api from "../../../config/api";
import {

  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
 
} from "./ActionCreator";


export const deleteUser = (userId) => {
  return async(dispatch) => {
    dispatch(deleteUserRequest());     
   try {
     const {data} = await api.delete(`/api/users/${userId}/delete`);
     console.log("delete order ",data)
     dispatch(deleteUserSuccess(userId));
   } catch (error) {
    console.log("catch error ",error)
     dispatch(deleteUserFailure(error));
   }
      
  };
};

