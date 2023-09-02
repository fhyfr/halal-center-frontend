import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewPayment = async (newPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/registration-payment`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newPayment,
  });

  return response.data.message;
};

export const editPayment = async (paymentId, updatePayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/registration-payment/${paymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatePayment,
  });

  return response.data.message;
};

export const deletePayment = async (paymentId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/registration-payment/${paymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
