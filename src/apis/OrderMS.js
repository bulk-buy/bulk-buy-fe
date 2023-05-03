import axios from "axios";

const OrderMS = axios.create({
  baseURL: process.env.REACT_APP_ORDER_MS_API_URL,
  withCredentials: true,
});

export default OrderMS;
