import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewOperationalPayment = async (newOperationalPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/operational-payment`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newOperationalPayment,
  });

  return response.data.message;
};

export const editOperationalPayment = async (operationalPaymentId, updateOperationalPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/operational-payment/${operationalPaymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateOperationalPayment,
  });

  return response.data.message;
};

export const deleteOperationalPayment = async (operationalPaymentId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/operational-payment/${operationalPaymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
