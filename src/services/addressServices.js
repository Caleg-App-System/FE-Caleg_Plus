import API from "./api";

export const AddressService = {
  getAllProvince: async () => {
    const response = await API.get("/provinsi/getall/json");
    console.log(response);
    return response;
  },

  getRegency: async (provinceId) => {
    const response = await API.get("/kabupaten/get/" + provinceId);
    console.log(response);
    return response;
  },

  getDistrict: async (regencyId) => {
    const response = await API.get("/kecamatan/get/" + regencyId);
    console.log(response);
    return response;
  },

  getVillage: async (districtId) => {
    const response = await API.get("/desa/get/" + districtId);
    console.log(response);
    return response;
  },
};