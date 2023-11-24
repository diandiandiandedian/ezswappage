import axios from "axios";
import { BASE_URL } from "../../config/constant";
import nextConfig from "../../next.config.js";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      BASE_URL + "api/queryCollectionPoolList",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
}

// export default async function handler(body) {
//   const res = { ok: false, status: null, data: {} };
//   try {
//     const response = await axios.post(
//       BASE_URL + "api/queryCollectionPoolList",
//       body
//     );
//     res.status = response.status;
//     res.data = response.data.data;
//     res.ok = true;
//   } catch (error) {
//     res.status = error.status;
//     res.ok = false;
//   }

//   return res;
// }
