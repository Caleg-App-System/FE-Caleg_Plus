import { AuthService } from "../../../services/authServices";
import { UsersService } from "../../../services/usersServices";
import SweatAlert from "../../SweatAlert";

export const registerActions = (data, history) => async (dispatch) => {
  try {
    await AuthService.register(data);
    SweatAlert("Register Success", "success");
    history("/login");
  } catch (error) {
    SweatAlert(String(error.response.data.message), "warning");
  }
};

export const loginActions = (data, history) => async (dispatch) => {
  try {
      const response = await AuthService.login(data);
      dispatch({type: 'LOGIN', payload: response.data});
      SweatAlert(response.data.message, 'success');
      history('/');
  } catch (error) {
      SweatAlert(String(error.response.data.message), 'warning')
  }   
}

export const logoutActions = (history, role) => async (dispatch) => {
  try {
      const response = await AuthService.logout();
      dispatch({type: 'LOGOUT', payload: response});
      SweatAlert('Success Logout', 'success');
      // role === "admin" ? history('/login/admin') : history('/login')
      history('/login');
  } catch (error) {
      SweatAlert(String(error.response.data.message), 'warning')
  }   
}

export const ApprovalActions = (id, data) => async (dispatch) => {
  try {
      const response = await UsersService.approval(id, data);
      SweatAlert('Approve Berhasil', 'success');
      dispatch({type: 'END'})  
      return response;
  } catch (error) {
      SweatAlert(String(error.response.data.message), 'warning')
      dispatch({type: 'END'})  
  }       
}