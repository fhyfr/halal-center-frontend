import axios from 'axios';
import { getSession } from '../../contexts/jwt-auth-context';
const { NEXT_PUBLIC_API } = process.env;

export const createNewCertificate = async (newCertificate) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'POST',
    url: `${NEXT_PUBLIC_API}/certificate`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: newCertificate,
  });

  return response.data.message;
};

export const deleteCertificate = async (certificateId) => {
  const accessToken = getSession();

  const response = await axios({
    method: 'DELETE',
    url: `${NEXT_PUBLIC_API}/certificate/${certificateId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.message;
};

export const downloadImportCertificatesTemplate = async (courseId) => {
  const accessToken = getSession();

  await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/upload/template/certificate/${courseId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseBlob = await axios({
    method: 'GET',
    url: `${NEXT_PUBLIC_API}/upload/template/certificate/${courseId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseType: 'blob', // Set the response type to 'blob' to handle binary data
  });

  // Create a temporary link element to trigger the download
  const url = window.URL.createObjectURL(new Blob([responseBlob.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `import_certificates_template_for_course_id_${courseId}.xlsx`); // Set the desired file name
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary link element
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const importCertificates = async (file) => {
  const accessToken = getSession();
  let formData = new FormData();
  formData.append('certificates', file);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      console.log(
        `Importing certificates progress: `,
        Math.round((event.loaded * 100) / event.total),
      );
    },
  };

  const response = await axios.post(`${NEXT_PUBLIC_API}/certificate/import`, formData, config);

  return response.data;
};
