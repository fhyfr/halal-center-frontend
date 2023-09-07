import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewInstructor = async (newInstructor) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/instructor`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newInstructor,
  });

  return response.data.message;
};

export const editInstructor = async (id, updateInstructor) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/instructor/${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateInstructor,
  });

  return response.data.message;
};

export const deleteInstructor = async (id) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/instructor/${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
