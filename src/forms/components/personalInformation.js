import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, setData } from '../store/formSlice';
import ConditionalRenderedComponent from '../../common/ConditionalRenderComponent';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .min(10, 'Address must be at least 10 characters')
    .max(100, 'Address must be at most 100 characters')
    .required('Address is required'),
});

const PersonalInformationForm = ({ isReview = false }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state?.forms?.step);
  const data = useSelector((state) => state?.forms?.data);

  return (
    <div className="mx-auto my-10 p-6 bg-white rounded shadow">
      <Formik
        initialValues={data?.personal_details}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(changeStep(step + 1));
          let newData = { ...data };
          newData.personal_details = values;
          dispatch(setData(newData));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Name
              </label>
              <Field
                disabled={isReview}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Email
              </label>
              <Field
                type="email"
                disabled={isReview}
                name="email"
                id="email"
                placeholder="Enter your email address"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Phone
              </label>
              <Field
                type="text"
                disabled={isReview}
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <div className="relative flex flex-col justify-start items-start">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Address
              </label>
              <Field
                type="text"
                disabled={isReview}
                name="address"
                id="address"
                placeholder="Enter your address"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.address && touched.address ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
              />
              <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            <ConditionalRenderedComponent>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </button>
            </ConditionalRenderedComponent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInformationForm;
