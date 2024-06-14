import axios from 'axios';

const request = axios.create({
  baseURL: 'http://172.28.222.12:8080/',
  timeout: 10000,
});

export default request;