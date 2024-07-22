import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const config = {
  headers: { Authorization: 'Bearer PASSWORD' },
};

const getModel = () => {
  return api.get('/v1/models/3', config).then((res) => {
    return res.data.model;
  });
};

export { getModel };
