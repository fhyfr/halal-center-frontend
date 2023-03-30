import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewPayment = async (newPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/payment`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newPayment,
  });

  return response.data.message;
};
