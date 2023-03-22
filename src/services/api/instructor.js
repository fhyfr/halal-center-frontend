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
