import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewCategory = async (categoryName) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/category`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { categoryName },
  });

  return response.data.message;
};
