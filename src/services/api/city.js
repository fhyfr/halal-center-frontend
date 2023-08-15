import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const getCitiesByProvinceId = async (provinceId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/city`,
    params: { provinceId },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
