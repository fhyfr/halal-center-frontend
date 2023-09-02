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

export const editCourse = async (courseId, updateCourse) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/course/${courseId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateCourse,
  });

  return response.data.message;
};

export const deleteCourse = async (courseId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/course/${courseId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};

export const registerCourse = async (courseId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/course/register/${courseId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
