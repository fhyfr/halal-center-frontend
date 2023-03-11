import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewPosition = async (positionName) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/position`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { positionName },
  });

  return response.data.message;
};

export const updatePosition = async (positionId, positionName) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/position/${positionId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { positionName },
  });

  return response.data.message;
};

export const deletePosition = async (positionId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/position/${positionId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
