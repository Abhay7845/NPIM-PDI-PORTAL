import axios from 'axios';
import { HOST_URL } from './UrlManager';

const token = sessionStorage.getItem("authToken");
console.log("token==>", token);

export const privateApiClient = axios.create({
    baseURL: HOST_URL,
    headers: {
        'Authorization': 'Bearer 3wdefev45546ebsdgrwety67poiuhgsjcdscgweof9qfknosadi9uwegd9wjcdcoiqwebfoiebfoid',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': "no-cach",
        "access-control-allow-origin": "*"
    },
});


