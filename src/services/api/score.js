import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewScore = async (newScoreData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/score`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newScoreData,
  });

  return response.data.message;
};

export const updateScore = async (scoreId, updateScoreData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/score/${scoreId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateScoreData,
  });

  return response.data.message;
};

export const deleteScore = async (scoreId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/score/${scoreId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
