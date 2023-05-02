import axios from "axios";

const BulkBuyMS = axios.create({
  baseURL: process.env.REACT_APP_BULKBUY_MS_API_URL,
  withCredentials: true,
});

export default BulkBuyMS;
