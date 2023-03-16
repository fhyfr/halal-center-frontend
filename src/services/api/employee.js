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