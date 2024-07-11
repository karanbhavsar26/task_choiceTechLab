import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep } from '../store/formSlice';
import ConditionalRenderedComponent from '../../common/ConditionalRenderComponent';

const validationSchema = Yup.object().shape({
  coverLetter: Yup.mixed().required('File is required'),
  resume: Yup.mixed().required('File is required')
});

const AdditionalDetailsForm = () => {
  const dispatch = useDispatch();
  const step = useSelector(state => state.forms.step);
  const data = useSelector(state => state.forms.data);

  return (
    <div className="mx-auto my-10 p-6 bg-white rounded shadow">
      <Formik
        initialValues={data?.additional_details}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values); // Handle form submission logic here
          dispatch(changeStep(step + 1));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Cover Letter 
              </label>
              <Field 
                type="file" 
                name="coverLetter" 
                id="coverLetter" 
                className={`mt-1 block w-full px-3 py-2 border ${errors.coverLetter && touched.coverLetter ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`} 
              />
              <ErrorMessage name="coverLetter" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Resume 
              </label>
              <Field 
                type="file" 
                name="resume" 
                id="resume" 
                className={`mt-1 block w-full px-3 py-2 border ${errors.resume && touched.resume ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`} 
              />
              <ErrorMessage name="resume" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <ConditionalRenderedComponent>
              <div className='flex gap-2'>
                <button type="button" className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-300" onClick={() => dispatch(changeStep(step - 1))}>
                  Previous
                </button>
                <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Next
                </button>
              </div>
            </ConditionalRenderedComponent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdditionalDetailsForm;
