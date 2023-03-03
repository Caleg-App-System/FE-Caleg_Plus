import API from "./api"

export const ValueFiltering = {
  getValueProvince: async () => {
    const response = await API.get("/provinsi/getall");
    console.log(response);
    return response;
  },

  getValueRegency: async () => {
    const response = await API.get("/kabupaten/getall");
    console.log(response);
    return response;
  },

  getValueDistrict: async () => {
    const response = await API.get("/kecamatan/getall");
    console.log(response);
    return response;
  },

  getValueVillage: async () => {
    const response = await API.get("/desa/getall");
    console.log(response);
    return response;
  },
}