import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewCourse = async (newCourse) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/course`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newCourse,
  });

  return response.data.message;
};
