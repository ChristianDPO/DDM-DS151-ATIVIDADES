import axios from 'axios';
import { API_KEY } from '@env';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY
  }
});
