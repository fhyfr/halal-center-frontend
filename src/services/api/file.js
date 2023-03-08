import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const uploadImage = async (imageFile) => {
  const accessToken = getSession();
  let formData = new FormData();
  formData.append('image', imageFile);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      console.log(`Uploading image progress: `, Math.round((event.loaded * 100) / event.total));
    },
  };

  const response = await axios.post(`${NEXT_PUBLIC_API}/upload/image`, formData, config);

  return response.data;
};

export const uploadDocument = async (documentFile) => {
  const accessToken = getSession();
  let formData = new FormData();
  formData.append('document', documentFile);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      console.log(`Uploading document progress: `, Math.round((event.loaded * 100) / event.total));
    },
  };

  const response = await axios.post(`${NEXT_PUBLIC_API}/upload/document`, formData, config);

  return response.data;
};
