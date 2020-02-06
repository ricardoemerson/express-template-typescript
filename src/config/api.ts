import axios, { AxiosInstance } from 'axios';

class Api {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'http://base-url.com',
    });
  }
}

export default new Api().http;
