import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:5129/api",
});

export default Api;
