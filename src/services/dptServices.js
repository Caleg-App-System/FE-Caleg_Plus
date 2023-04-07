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

  getNewDpt: async () => {
    const response = await API.get("/dpp/getallNewDPT");
    return response;
  },

  getAllDpp: async () => {
    const response = await API.get("/dpp/getallDPP");
    return response;
  },

  approveDpp: async (id) => {
    const response = await API.get(`/dpp/approve/${id}`);
    return response;
  },

  getAllKecamatan: async () => {
    const response = await API.get("/kecamatan/getall");
    return response;
  },
  getAllDesaByKecamatanId: async (kecamatanId) => {
    const response = await API.get(`/desa/getAllByKecamatanId/${kecamatanId}`);
    return response;
  },
  getTpsById: async (desaId) => {
    const response = await API.get(`/tps/getAllByDesaId/${desaId}`);
    return response;
  },
};