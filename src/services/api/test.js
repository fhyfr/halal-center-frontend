import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewTest = async (newTestData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/test`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newTestData,
  });

  return response.data.message;
};

export const updateTest = async (testId, updateTestData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/test/${testId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateTestData,
  });

  return response.data.message;
};

export const deleteTest = async (testId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/test/${testId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
