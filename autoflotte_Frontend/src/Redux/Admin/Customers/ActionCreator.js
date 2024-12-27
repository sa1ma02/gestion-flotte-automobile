import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS} from "./ActionType";


  

export const deleteUserRequest = () => ({
    type: DELETE_USER_REQUEST,
  });
  
  export const deleteUserSuccess = (userId) => ({
    type: DELETE_USER_SUCCESS,payload:userId
  });
  
  export const deleteUserFailure = (error) => ({
    type: DELETE_USER_FAILURE,
    payload: error,
  });

