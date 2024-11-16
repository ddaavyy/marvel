import axios from "axios";
import md5 from "md5";

const privateKey = '368052fa575cbfc1f712cdc1a9b7e3a56c519d84'
const publicKey = '4abce8ad9e359c85263a6e8a7836e7f5'
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey)

const api = axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public',
    params: {
        ts,
        apikey: publicKey,
        hash,
    },
})

export default api