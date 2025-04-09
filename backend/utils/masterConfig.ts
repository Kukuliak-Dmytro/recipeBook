import validateEnvironmentVariables from "./validate";
import axiosConfig from "./configs/axiosConfig";
import serverConfig from "./configs/serverConfig";
import dotenv from "dotenv";
dotenv.config();

// Validate environment variables
validateEnvironmentVariables();

const masterConfig={
    axios:axiosConfig,
    server:serverConfig
    //more configs can be added here
}
export default masterConfig