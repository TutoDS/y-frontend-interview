import axios from 'axios';

const api = axios.create({
	baseURL: 'http://numbersapi.com/'
});

export default api;
