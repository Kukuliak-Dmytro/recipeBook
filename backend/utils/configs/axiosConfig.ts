import dotenv from "dotenv"
dotenv.config()
const apiUrl=process.env.API_URL! 
const apiKey=process.env.API_KEY!


const axiosConfig ={
    //the specifics of the api: key included in the url
    baseURL:'https://' + apiUrl + apiKey,
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
    },
}
export default axiosConfig
