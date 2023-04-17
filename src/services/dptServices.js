import API from "./api";

export const DptService = {
  // getAllDpt: async () => {
  //   const response = await API.get("/dpp/getall");
  //   return response;
  // },

  getDptAll: async (page, perPage) => {
    const response = await API.get(`/dpp/getall?page=${page}&limit=${perPage}`);
    return response;
  },

  getDptByRows: async (page, newPerPage) => {
    const response = await API.get(`/dpp/getall?page=${page}&limit=${newPerPage}`);
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
    const response = await API.put(`/dpp/approve/${id}`);
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
  countDptByTpsId: async (tpsId) => {
    const response = await API.get(`/dpp/count/${tpsId}`);
    return response;
  },
};