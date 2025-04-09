
const apiUrl=process.env.API_URL! 
const apiKey=process.env.API_KEY!


const axiosConfig ={

    baseURL: apiUrl+apiKey,
    headers: {
        "Content-Type": "application/json",
    },
}
export default axiosConfig
