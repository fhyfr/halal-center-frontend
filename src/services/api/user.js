import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewUser = async (newUser) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/user`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newUser,
  });

  return response.data.message;
};

export const updateUser = async (userId, user) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/user/${userId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: user,
  });

  return response.data.message;
};

export const deleteUser = async (userId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/user/${userId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};

export const resetPasswordUser = async (userId, newPassword, confirmNewPassword) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/user/reset-password/${userId}/admin`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      newPassword,
      confirmNewPassword,
    },
  });

  return response.data.message;
};

export const getCurrentUser = async (accessToken) => {
  const response = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/user/current/self`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
