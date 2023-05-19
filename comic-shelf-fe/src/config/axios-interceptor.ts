import axios from 'axios';
import { BASE_MARVEL_URL } from 'src/shared/reducers/api-urls';
import { saveItemToLocalStorage } from 'src/shared/util/general-utils';
import MD5 from 'src/shared/util/md5';
import { AUTH_TOKEN_KEY } from './constans';

// axios.interceptors.request.use(
//   (config) => {
//     if (!config.url?.includes(BASE_MARVEL_URL)) {
//       let JWT = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY) || '';
//       if (JWT) JWT = JSON.parse(JWT);
//       if (JWT === '') return config;
//       return {
//         ...config,
//         headers: {
//           ...config.headers,
//           Authorization: `Bearer ${JWT}`,
//         },
//       };
//     }
//     let PRIV_KEY = localStorage.getItem('PRIVATE_API_KEY') || '';
//     if (PRIV_KEY) PRIV_KEY = JSON.parse(PRIV_KEY);
//     let PUBLIC_KEY = localStorage.getItem('PUBLIC_API_KEY') || '';
//     if (PUBLIC_KEY) PUBLIC_KEY = JSON.parse(PUBLIC_KEY);
//     const ts = new Date().getTime();
//     const hash = MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
//     return {
//       ...config,
//       params: { ...config.params, ts, apikey: PUBLIC_KEY, hash },
//     };
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  (response) => {
    if (!response?.config?.url?.includes(BASE_MARVEL_URL)) return response;
    // caching response
    const parsedURL = encodeURI(response.config.url || '');
    saveItemToLocalStorage(parsedURL, response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
