import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewEmployee = async (newEmployee) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/employee`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newEmployee,
  });

  return response.data.message;
};

export const mutationEmployee = async (employeeId, newEmployee) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/employee/mutation/${employeeId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newEmployee,
  });

  return response.data.message;
};

export const editEmployee = async (employeeId, updateEmployee) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/employee/${employeeId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateEmployee,
  });

  return response.data.message;
};

export const deleteEmployee = async (employeeId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/employee/${employeeId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
