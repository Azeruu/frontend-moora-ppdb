import axios from "axios";

export default axios.create({
    baseURL: "https://azeru.live",
    withCredentials: true
});
