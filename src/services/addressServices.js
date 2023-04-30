import API from "./api";

export const AddressService = {
  getAllProvince: async () => {
    const response = await API.get("/provinsi/getall/json");
    return response;
  },

  getRegency: async (provinceId) => {
    const response = await API.get("/kabupaten/get/" + provinceId);
    return response;
  },

  getDistrict: async (regencyId) => {
    const response = await API.get("/kecamatan/get/" + regencyId);
    return response;
  },

  getVillage: async (districtId) => {
    const response = await API.get("/desa/get/" + districtId);
    return response;
  },
};