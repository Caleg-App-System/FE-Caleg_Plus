import API from "./api"

export const UsersService = {
  getUsers: async () => {
    const response = await API.get('/auth/getall');
    return response;
  },

  getUsersById: async (id) => {
    const response = await API.get('/auth/getbyid/' + id);
    return response;
  },

  approval: async (id) => {
    console.log(id)
    const response = await API.put('/auth/activate/role/' + id);
    return response;
  },

  archived: async (username) => {
    const response = await API.put('/update/archivet/' + username);
    return response;
  },

  unarchived: async (username) => {
    const response = await API.put('/update/archivef/' + username);
    return response;
  },
}