import axios from "axios";

const ListingMS = axios.create({
  baseURL: process.env.REACT_APP_LISTING_MS_API_URL,
  withCredentials: true,
});

export default ListingMS;
