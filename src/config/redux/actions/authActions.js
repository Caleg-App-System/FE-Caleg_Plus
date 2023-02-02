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
