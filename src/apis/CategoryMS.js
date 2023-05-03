import axios from "axios";

const CategoryMS = axios.create({
  baseURL: process.env.REACT_APP_CATEGORY_MS_API_URL,
  withCredentials: true,
});

export default CategoryMS;
