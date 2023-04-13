import API from "./api";

export const CountServices = {
  countDPT: async () => {
    const response = await API.get("/dpt/count");
    return response;
  },
  countDPP: async () => {
    const response = await API.get("/dpp/count");
    return response;
  },
  countUser: async () => {
    const response = await API.get("/user/count");
    return response;
  },
};