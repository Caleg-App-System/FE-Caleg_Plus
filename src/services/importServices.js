import API from "./api"

export const ImportService = {
  importExcel: async (data) => {
    const response = await API.post("/parpol/uploadfile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  importDPT: async (data) => {
    const response = await API.post("/dpp/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};