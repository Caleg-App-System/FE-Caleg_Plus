import API from "./api";

export const AuthService = {
  register: async (data) => {
    const response = await API.post("/auth/register", data);
    return response;
  },

  login : async (data) => {
    const response = await API.post('/auth/login', data);
    const Username = response.data.data.user.username;
    const Role = response.data.data.user.role;
    const id = response.data.data.user.id;
    const email = response.data.data.user.email;
    setHeadersAndStorage(response.data, Username, id, email, Role);
    console.log(Username)
    // if (data.rememberMe === true) {
    //     setTimeout(() => {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('isLogged');
    //     }
    //     , 604800000);
    // } else {
    //     setTimeout(() => {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('isLogged');
    //     }
    //     , 86400000);
    // }
    console.log(response.data);
    
    return response;
  },

  logout : async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    return;
  }
};

const setHeadersAndStorage = ({ user, token}, Username, id, email, Role,) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('username', JSON.stringify(Username));
  localStorage.setItem('id', JSON.stringify(id));
  localStorage.setItem('token', token);
  localStorage.setItem('isLogged',true);
  localStorage.setItem('role', JSON.stringify(Role));
  if (email) {
      localStorage.setItem('email', JSON.stringify(email));
  }
}