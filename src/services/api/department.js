import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewDepartment = async (departmentName) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/department`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { departmentName },
  });

  return response.data.message;
};

export const updateDepartment = async (departmentId, departmentName) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/department/${departmentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { departmentName },
  });

  return response.data.message;
};

export const deleteDepartment = async (departmentId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/department/${departmentId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
