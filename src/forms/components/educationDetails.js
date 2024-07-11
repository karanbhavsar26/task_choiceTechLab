import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { changeStep, setData } from '../store/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import ConditionalRenderedComponent from '../../common/ConditionalRenderComponent';

const validationSchema = Yup.object().shape({
  ssc: Yup.object().shape({
    name: Yup.string().required('School/Institute Name is required'),
    board: Yup.string().required('Board/University is required'),
    cgpa: Yup.number().required('CGPA is required').min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot be more than 10'),
    year: Yup.number().required('Passing Year is required').min(1900, 'Invalid year').max(2024, 'Invalid year'),
  }),
  hsc: Yup.object().shape({
    name: Yup.string().required('School/Institute Name is required'),
    board: Yup.string().required('Board/University is required'),
    cgpa: Yup.number().required('CGPA is required').min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot be more than 10'),
    year: Yup.number().required('Passing Year is required').min(1900, 'Invalid year').max(2024, 'Invalid year'),
  }),
  graduation: Yup.object().shape({
    name: Yup.string().required('School/Institute Name is required'),
    board: Yup.string().required('Board/University is required'),
    cgpa: Yup.number().required('CGPA is required').min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot be more than 10'),
    year: Yup.number().required('Passing Year is required').min(1900, 'Invalid year').max(2024, 'Invalid year'),
  }),
  postGraduation: Yup.object().shape({
    name: Yup.string().required('School/Institute Name is required'),
    board: Yup.string().required('Board/University is required'),
    cgpa: Yup.number().required('CGPA is required').min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot be more than 10'),
    year: Yup.number().required('Passing Year is required').min(1900, 'Invalid year').max(2024, 'Invalid year'),
  }),
});

const EducationForm = ({isReview=false}) => {
  const dispatch=useDispatch()
  const step = useSelector((state) => state?.forms?.step);
  const data = useSelector((state) => state?.forms?.data);
  return (
    <div className=" mx-auto my-10 p-6 bg-white rounded shadow">
      <Formik
         initialValues={data?.education_details}
         enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("values",values)
          dispatch(changeStep(step+1))
          let newData={...data}
          newData.education_details=values
          console.log("newData",newData)
          dispatch(setData(newData))

        }}
      >
        {({ touched, errors }) => (
          <Form className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="">
                    <th className="py-2 px-4">School/Institute Name</th>
                    <th className="py-2 px-4">Board/University</th>
                    <th className="py-2 px-4">CGPA</th>
                    <th className="py-2 px-4">Passing Year</th>
                  </tr>
                </thead>
                <tbody>
                  {['ssc', 'hsc', 'graduation', 'postGraduation'].map((level) => (
                    <tr key={level}>
                      <td className="py-2 px-4">
                        <Field
                          type="text"
                          name={`${level}.name`}
                          placeholder="School/Institute Name"
                          disabled={true}
                          className={`w-full px-3 py-2 border ${errors[level]?.name && touched[level]?.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`${level}.name`} component="div" className="text-left text-red-500 text-xs mt-1" style={{ minHeight: '1rem' }} />
                      </td>
                      <td className="py-2 px-4">
                        <Field
                          type="text"
                          disabled={isReview}
                          name={`${level}.board`}
                          placeholder="Board/University"
                          className={`w-full px-3 py-2 border ${errors[level]?.board && touched[level]?.board ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`${level}.board`} component="div" className="text-left text-red-500 text-xs mt-1" style={{ minHeight: '1rem' }} />
                      </td>
                      <td className="py-2 px-4">
                        <Field
                          type="number"
                          disabled={isReview}
                          name={`${level}.cgpa`}
                          placeholder="CGPA"
                          className={`w-full px-3 py-2 border ${errors[level]?.cgpa && touched[level]?.cgpa ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`${level}.cgpa`} component="div" className="text-left text-red-500 text-xs mt-1" style={{ minHeight: '1rem' }} />
                      </td>
                      <td className="py-2 px-4">
                        <Field
                          type="number"
                          disabled={isReview}
                          name={`${level}.year`}
                          placeholder="Passing Year"
                          className={`w-full px-3 py-2 border ${errors[level]?.year && touched[level]?.year ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`${level}.year`} component="div" className="text-left text-red-500 text-xs mt-1" style={{ minHeight: '1rem' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ConditionalRenderedComponent>

            <div className='flex gap-2'>
            <button type="button" className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-300" onClick={()=>dispatch(changeStep(step-1))}>
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

export default EducationForm;
