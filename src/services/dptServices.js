import API from "./api";

export const DptService = {
  getAllDpt: async () => {
    const response = await API.get("/dpp/getall");
    return response;
  },

  getDptById: async (id) => {
    const response = await API.get(`/dpp/getById/${id}`);
    return response;
  },
};