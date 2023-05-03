import axios from "axios";

const ItemMS = axios.create({
  baseURL: process.env.REACT_APP_ITEM_MS_API_URL,
  withCredentials: true,
});

export default ItemMS;
