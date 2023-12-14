import axios from "axios";

export default axios.create({
    baseURL: "http://47.254.65.36",
    withCredentials: true
});
