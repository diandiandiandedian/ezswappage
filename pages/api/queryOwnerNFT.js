import axios from 'axios';
import { BASE_URL } from '../../config/constant';
export default async function handler(req, res) {
    try {
        const response = await axios.post(BASE_URL+ 'queryOwnerNFT', req.body);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {});
    }
}
