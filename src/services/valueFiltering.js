import API from "./api"

export const ValueFiltering = {
  getValueProvince: async () => {
    const response = await API.get("/provinsi/getall");
    return response;
  },

  getValueRegency: async () => {
    const response = await API.get("/kabupaten/getall");
    return response;
  },

  getValueDistrict: async () => {
    const response = await API.get("/kecamatan/getall");
    return response;
  },

  getValueVillage: async () => {
    const response = await API.get("/desa/getall");
    return response;
  },
}