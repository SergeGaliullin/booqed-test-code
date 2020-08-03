import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Token 1dc5aa9e8d06c1ade2befc9e443f3de9532d4937`,
    }
});