import axios from "axios";

const UserMS = axios.create({
  baseURL: process.env.REACT_APP_USER_MS_API_URL,
  withCredentials: true,
});

export default UserMS;
