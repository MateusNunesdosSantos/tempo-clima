import axios from 'axios';

//https://api.hgbrasil.com/weather?key=56402425&lat=-23.682&lon=-46.875&user_ip=remote

export const key = '56402425';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
});

export default api;
