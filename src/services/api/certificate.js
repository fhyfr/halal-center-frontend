import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewCertificate = async (newCertificate) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/certificate`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newCertificate,
  });

  return response.data.message;
};

export const deleteCertificate = async (certificateId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/certificate/${certificateId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
