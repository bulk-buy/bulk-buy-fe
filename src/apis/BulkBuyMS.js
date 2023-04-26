import axios from "axios";

const BulkBuyMS = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export default BulkBuyMS;
