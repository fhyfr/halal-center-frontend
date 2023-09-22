import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const createNewAttendance = async (newAttendanceData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/attendance`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newAttendanceData,
  });

  return response.data.message;
};

export const updateAttendance = async (attendanceId, updateAttendanceData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/attendance/${attendanceId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateAttendanceData,
  });

  return response.data.message;
};

export const deleteAttendance = async (attendanceId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/attendance/${attendanceId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};
