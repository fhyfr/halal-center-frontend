import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewDocument = async (newDocument) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/document`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newDocument,
  });

  return response.data.message;
};

export const deleteDocument = async (documentId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/document/${documentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
