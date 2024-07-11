import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, setData } from '../store/formSlice';
import ConditionalRenderedComponent from '../../common/ConditionalRenderComponent';

const validationSchema = Yup.object().shape({
  experiences: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required('Company Name is required.'),
      jobTitle: Yup.string().required('Job Title is required.'),
      duration: Yup.string().required('Duration is required.')
    })
  )
});


const WorkExperienceForm = ({isReview=false}) => {
  const dispatch=useDispatch()
  const step = useSelector((state) => state?.forms?.step);
  const data = useSelector((state) => state?.forms?.data);

  return (
    <div className="mx-auto my-10 p-6 bg-white rounded shadow">
      <Formik
               initialValues={data?.working_details}
               enableReinitialize      
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(changeStep(step+1))
          let newData={...data}
          newData.working_details=values
          console.log("newData",newData)
          dispatch(setData(newData))

        }}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4">
            <FieldArray name="experiences">
              {({ push, remove }) => (
                <div>
                  <div className="grid grid-cols-10 gap-4 items-center">
                    <label className="text-left block text-sm font-medium text-gray-700 col-span-3">
                      Company Name
                    </label>
                    <label className="text-left block text-sm font-medium text-gray-700 col-span-3">
                      Job Title 
                    </label>
                    <label className="text-left block text-sm font-medium text-gray-700 col-span-3">
                      Duration
                    </label>
                  </div>
                  {values.experiences.map((experience, index) => (
                    <div key={index} className="grid grid-cols-10 gap-4 my-4 items-center">
                      <div className="relative flex flex-col justify-start items-start col-span-3">
                        <Field
                          type="text"
                          disabled={isReview}
                          name={`experiences.${index}.company`}
                          placeholder="Company Name"
                          className={`mt-1 block w-full px-3 py-2 border ${errors.experiences?.[index]?.company && touched.experiences?.[index]?.company ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`experiences.${index}.company`} component="div" className="text-left text-red-500 text-xs mt-1" />
                      </div>
                      <div className="relative flex flex-col justify-start items-start col-span-3">
                        <Field
                          type="text"
                          disabled={isReview}
                          name={`experiences.${index}.jobTitle`}
                          placeholder="Job Title"
                          className={`mt-1 block w-full px-3 py-2 border ${errors.experiences?.[index]?.jobTitle && touched.experiences?.[index]?.jobTitle ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`experiences.${index}.jobTitle`} component="div" className="text-left text-red-500 text-xs mt-1" />
                      </div>
                      <div className="relative flex flex-col justify-start items-start col-span-3">
                        <Field
                          type="text"
                          disabled={isReview}
                          name={`experiences.${index}.duration`}
                          placeholder="Duration"
                          className={`mt-1 block w-full px-3 py-2 border ${errors.experiences?.[index]?.duration && touched.experiences?.[index]?.duration ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage name={`experiences.${index}.duration`} component="div" className="text-left text-red-500 text-xs mt-1" />
                      </div>
                     
                       <div className="relative flex items-center justify-center">
                       <button
                         type="button"
                         onClick={() => remove(index)}
                         className={`ml-2 ${isReview ?'text-gray-500 cursor-not-allowed':'text-red-500'}`}
                         disabled={isReview}
                       >
                         <MdDelete />
                       </button>
                     </div>
                    
                     
                    </div>
                  ))}
                   {
                       ! isReview && 
                  <div className="flex items-start justify-start mt-4">
                    
                    <button
                      type="button"
                      disabled={isReview}
                      onClick={() => push({ company: '', jobTitle: '', duration: '' })}
                      className="text-left bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    >
                      <IoMdAddCircleOutline className="inline-block mr-2" />
                      Add Experience
                    </button>
                  </div>}
                </div>
              )}
            </FieldArray>
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

export default WorkExperienceForm;
