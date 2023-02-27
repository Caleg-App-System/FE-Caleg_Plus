import { ImportService } from "../../../services/importServices";
import SweatAlertTimer from "../../SweatAlert/timer";

export const PostImportExcel = (data) => async (dispatch) => {
  try {
    const response = await ImportService.importExcel(data);
    SweatAlertTimer(response.data.message, "success")
    return response;
  } catch (error) {
    SweatAlertTimer(String(error.response.data.message), "warning");
  }
}