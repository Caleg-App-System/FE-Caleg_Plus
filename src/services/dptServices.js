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

  getAllKecamatan: async () => {
    const response = await API.get("/kecamatan/getall");
    return response;
  },
  getDesaById: async (kecamatanId) => {
    const response = await API.get(`/desa/getById/${kecamatanId}`);
    return response;
  },
  getTpsById: async (desaId) => {
    const response = await API.get(`/tps/getById/${desaId}`);
    return response;
  },
};