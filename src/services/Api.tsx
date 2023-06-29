import axios, { AxiosInstance } from 'axios';

// const ApiCars: AxiosInstance = axios.create({
//   baseURL: 'https://kenzie-kars.herokuapp.com/cars',
//   timeout: 5000
// });

const ApiNetwork: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export { ApiNetwork }