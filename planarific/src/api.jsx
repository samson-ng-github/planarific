import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fedevtest.azurewebsites.net',
});

const config = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
  },
};

const getLogo = () => {
  return api
    .get('/planarific.webp', { ...config, responseType: 'blob' })
    .then((res) => {
      return URL.createObjectURL(res.data);
    });
};

const getModels = () => {
  return api.get('/v1/models', config).then((res) => {
    return res.data;
  });
};

const getModel = (url = '/v1/models/1') => {
  return api.get(url, config).then((res) => {
    return res.data;
  });
};

const getThumb = (url = '/thumbs/1.png') => {
  return api.get(url, { ...config, responseType: 'blob' }).then((res) => {
    return URL.createObjectURL(res.data);
  });
};

export { getLogo, getModels, getModel, getThumb };
