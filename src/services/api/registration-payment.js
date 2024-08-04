import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewRegistrationPayment = async (newRegistrationPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/registration-payment`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newRegistrationPayment,
  });

  return response.data.message;
};

export const editRegistrationPayment = async (registrationPaymentId, updateRegistrationPayment) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/registration-payment/${registrationPaymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateRegistrationPayment,
  });

  return response.data.message;
};

export const deleteRegistrationPayment = async (registrationPaymentId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/registration-payment/${registrationPaymentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
