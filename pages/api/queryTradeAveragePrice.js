import axios from 'axios';
import { BASE_URL } from '../../config/constant';
import nextConfig from '../../next.config.js'

export default async function handler(req, res) {
  try {
    // const response = await axios.post("https://testapi.ezswap.io/tradeActivity/queryTradeAveragePrice", req.body);
    const response = await axios.post(BASE_URL + "tradeActivity/queryTradeAveragePrice", req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
}


