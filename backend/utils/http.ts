import axios from "axios";
import axiosConfig from "./configs/axiosConfig";

const axiosClient = axios.create(axiosConfig);

export default axiosClient;