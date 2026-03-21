import axios from 'axios';

const API_KEY = '55082106-4cb46bb19233a000c0dff9eca';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
return axios
.get(BASE_URL, {
params: {
key: API_KEY,
q: query,
image_type: 'photo',
orientation: 'horizontal',
safesearch: true,
},
})
.then(response => response.data); 
} 