import API from "./api";

export const AuthService = {
  register: async (data) => {
    const response = await API.post("/auth/register", data);
    return response;
  },
};
