import axios from 'axios';
const API = 'http://localhost:8080/api/posts';
export const getAllPosts = async () => (await axios.get(API)).data;
