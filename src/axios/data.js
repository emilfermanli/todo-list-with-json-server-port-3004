import axios from "axios"

var url = "http://localhost:3004"

export default axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'application/json',
    },
});