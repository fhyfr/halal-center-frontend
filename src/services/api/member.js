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

export const updateProfile = async (updateValues) => {
  if (!updateValues.facebook) {
    delete updateValues.facebook;
  }

  if (!updateValues.linkedin) {
    delete updateValues.linkedin;
  }

  const accessToken = getSession();
  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/member`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateValues,
  });

  return response.data.message;
};

export const forgotPassword = async (email) => {
  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/user/forgot-password`,
    data: { email },
  });

  return response.data.message;
};

export const verifyOTP = async (email, otp) => {
  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/auth/verify-otp`,
    data: { email, otp: parseInt(otp, 10) },
  });

  return response.data;
};

export const resendOTP = async (email) => {
  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/auth/resend-otp`,
    data: { email },
  });

  return response.data.message;
};

export const resetPassword = async (id, newPassword, confirmNewPassword) => {
  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/user/reset-password/${id}`,
    data: { newPassword, confirmNewPassword },
  });

  return response.data.message;
};
