import API from "./api";

export const DptService = {
  getAllDpt: async () => {
    const response = await API.get("/dpp/getall");
    console.log(response);
    return response;
  }
};