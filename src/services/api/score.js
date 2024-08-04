import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';

const { NEXT_PUBLIC_API } = process.env;

export const findScoreByTestIdAndUserId = async (testId, userId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/score`,
    params: {
      testId,
      userId,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createNewScore = async (newScoreData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/score`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newScoreData,
  });

  return response.data.message;
};

export const updateScore = async (scoreId, updateScoreData) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'PUT',
    url: `${NEXT_PUBLIC_API}/score/${scoreId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updateScoreData,
  });

  return response.data.message;
};

export const deleteScore = async (scoreId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/score/${scoreId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};

export const downloadImportScoresTemplate = async (testId) => {
  const accessToken = getSession();

  await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/upload/template/score/${testId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseBlob = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/upload/template/score/${testId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseType: 'blob', // Set the response type to 'blob' to handle binary data
  });

  // Create a temporary link element to trigger the download
  const url = window.URL.createObjectURL(new Blob([responseBlob.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `import_scores_template_for_test_id_${testId}.xlsx`); // Set the desired file name
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary link element
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const importScores = async (file) => {
  const accessToken = getSession();

  const formData = new FormData();
  formData.append('scores', file);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      console.log(`Importing scores progress: `, Math.round((event.loaded * 100) / event.total));
    },
  };

  const response = await axios.post(`${NEXT_PUBLIC_API}/score/import`, formData, config);

  return response.data;
};
