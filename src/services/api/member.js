import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const updatePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/user/password`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: { password: currentPassword, newPassword, confirmNewPassword: newPasswordConfirmation },
  });

  return response.data.message;
};
