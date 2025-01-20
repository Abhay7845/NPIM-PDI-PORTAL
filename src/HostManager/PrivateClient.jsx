import axios from 'axios';
import { HOST_URL } from './UrlManager';

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

// export const privateApiClientAdmin = axios.create({
//     baseURL: HOST_URL,
//     headers: {
//         'Authorization': 'Bearer 3wdefev45546ebsdgrwety67poiuhgsjcdscgweof9qfknosadi9uwegd9wjcdcoiqwebfoiebfoid',
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Cache-Control': "no-cach",
//         "access-control-allow-origin": "*"
//     },
// });

// export const privateApiClientL1L2 = axios.create({
//     baseURL: HOST_URL,
//     headers: {
//         'Authorization': 'Bearer 3wdefev45546ebsdgrwety67poiuhgsjcdscgweof9qfknosadi9uwegd9wjcdcoiqwebfoiebfoid',
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Cache-Control': "no-cach",
//         "access-control-allow-origin": "*"
//     },
// });

export const privateApiClientImage = axios.create({
    baseURL: HOST_URL,
    headers: {
        'Authorization': 'Bearer 3wdefev45546ebsdgrwety67poiuhgsjcdscgweof9qfknosadi9uwegd9wjcdcoiqwebfoiebfoid',
        "Content-Type": "multipart/form-data",
    },
});


