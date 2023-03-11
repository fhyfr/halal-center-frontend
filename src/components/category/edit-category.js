import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { updateCategory } from '../../services/api/category';
import { handleRedirectOnClick } from '../../utils/handle-event-button';

export const EditCategory = ({ category }) => {
  const router = useRouter();

  const [info, setInfo] = useState(undefined);
  const [errMessage, setErrMessage] = useState(undefined);

  const formik = useFormik({
    initialValues: {
      categoryName: category.categoryName,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Category Name is required'),
    }),
    onSubmit: async (values) => {
      updateCategory(category.categoryId, values.categoryName)
        .then((res) => {
          setInfo(res);
          setErrMessage(undefined);
          setTimeout(() => {
            router.push('/category');
          }, 2000);
        })
        .catch((err) => {
          setErrMessage(err.response.data?.message);
          setInfo(undefined);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Fill out this form for edit category" title="Edit Category" />
        <Divider />
        <CardContent>
          {info && (
            <Alert sx={{ marginY: 1 }} severity="success">
              {info}
            </Alert>
          )}

          {errMessage && (
            <Alert sx={{ marginY: 1 }} severity="error">
              {errMessage}
            </Alert>
          )}

          <FormControl sx={{ marginY: 1 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-category-name">Category Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-category-name"
              label="Category Name"
              name="categoryName"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.categoryName}
            />
            {Boolean(formik.touched.categoryName && formik.errors.categoryName) && (
              <FormHelperText error>{formik.errors.categoryName}</FormHelperText>
            )}
          </FormControl>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            sx={{ mx: 1 }}
            type="button"
            disabled={formik.isSubmitting}
            color="error"
            variant="text"
            onClick={() => {
              handleRedirectOnClick(router, '/category');
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ mx: 1 }}
            type="submit"
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};
