// import axios from 'axios';
// import {PetApi, UserApi,Configuration} from '../generated';
// import 'react-native-url-polyfill/auto';


// const config = new Configuration();

// const axiosInstance = axios.create({
//   auth: {
//     username: 'Dhrupal',
//     password: 'Dhrupal@2001'
//   }
// });

// const petApi = new PetApi(config, 'example.com', axiosInstance);
// const userApi = new UserApi(config, 'example.com', axiosInstance);

// export {petApi, userApi};


import 'react-native-url-polyfill/auto';
import {PetApi, UserApi} from '../generated';

const petApi = new PetApi();
const userApi = new UserApi();

export {petApi, userApi};