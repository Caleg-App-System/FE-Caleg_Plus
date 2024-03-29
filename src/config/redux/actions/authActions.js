import { AuthService } from "../../../services/authServices";
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
    dispatch({ type: 'LOGIN', payload: response.data });
    SweatAlert(response.data.message, 'success');
    history('/');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'warning')
  }
}

export const loginAdminActions = (data, history) => async (dispatch) => {
  try {
    const response = await AuthService.login(data);
    dispatch({ type: 'LOGIN', payload: response.data });
    SweatAlert(response.data.message, 'success');
    history('/admin');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'warning')
  }
}

export const logoutActions = (history, role) => async (dispatch) => {
  try {
    const response = await AuthService.logout();
    dispatch({ type: 'LOGOUT', payload: response });
    SweatAlert('Success Logout', 'success');
    role === "admin" ? history('/') : history('/login')
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'warning')
  }
}

export const verifyAccountActions = (data, history) => async (dispatch) => {
  try {
    await AuthService.verifyAccount(data);
    SweatAlert('Akun berhasil diverifikasi', 'success');
    history('/success/verification');
  } catch (error) {
    SweatAlert(String(error.response.data.message), 'warning')
  }
}