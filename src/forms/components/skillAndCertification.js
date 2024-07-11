import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { changeStep, setData, setSelectedSkills } from '../store/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import ConditionalRenderedComponent from '../../common/ConditionalRenderComponent';

const skillOptions = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  // Add more skills as needed
];

const validationSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      certificationName: Yup.string().required('Certification Name is required.'),
      completionDate: Yup.date().required('Completion Date is required.'),
    })
  ),
  skills: Yup.array().min(1, 'At least one skill is required.'),
});

const CertificationForm = ({ isReview = false }) => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state?.forms?.step);
  const data = useSelector((state) => state?.forms?.data);
  const selectedSkills = useSelector((state) => state?.forms?.selectedSkills);

  const handleSkillChange = (event, setFieldValue) => {
    const { value } = event.target;
    if (!selectedSkills.includes(value)) {
      dispatch(setSelectedSkills([...selectedSkills, value]));
      setFieldValue('skills', [...selectedSkills, value]);
    }
  };

  const handleRemoveSkill = (skillToRemove, setFieldValue) => {
    const updatedSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    dispatch(setSelectedSkills(updatedSkills));
    setFieldValue('skills', updatedSkills);
  };

  return (
    <div className="mx-auto my-10 p-6 bg-white rounded shadow">
      <Formik
        initialValues={data?.skills_and_certification}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(changeStep(step + 1));
          let newData = { ...data };
          newData.skills_and_certification = values;
          dispatch(setData(newData));
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <FieldArray name="certifications">
              {({ push, remove }) => (
                <div>
                  <div className="flex justify-start items-start text-lg mb-4 font-semibold">Skills</div>
                  <div className="mt-4">
                    {!isReview && (
                      <select
                        disabled={isReview}
                        name="selectedSkill"
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.skills && touched.skills ? 'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        onChange={(e) => handleSkillChange(e, setFieldValue)}
                      >
                        <option value="">Select a skill...</option>
                        {skillOptions.map((skill) => (
                          <option key={skill.value} value={skill.value}>
                            {skill.label}
                          </option>
                        ))}
                      </select>
                    )}
                    <ErrorMessage name="skills" component="div" className="text-left text-red-500 text-xs mt-1" />
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap mt-2">
                      {selectedSkills.map((skill, index) => (
                        <div key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md mr-2 mb-2 flex items-center">
                          {skill}
                          {!isReview && <MdDelete className="ml-1 cursor-pointer" onClick={() => handleRemoveSkill(skill, setFieldValue)} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-start items-start text-lg mb-4 font-semibold">Certification</div>
                  <div className="grid grid-cols-11 gap-4 items-center">
                    <label className="col-span-5 text-left block text-sm font-medium text-gray-700">Certification Name</label>
                    <label className="col-span-5 text-left block text-sm font-medium text-gray-700">Completion Date</label>
                  </div>

                  {values.certifications.map((certification, index) => (
                    <div key={index} className="grid grid-cols-11 gap-4 my-4 items-center">
                      <div className="col-span-5">
                        <Field
                          type="text"
                          disabled={isReview}
                          name={`certifications.${index}.certificationName`}
                          placeholder="Certification Name"
                          className={`mt-1 block w-full px-3 py-2 border ${
                            errors.certifications?.[index]?.certificationName && touched.certifications?.[index]?.certificationName
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage
                          name={`certifications.${index}.certificationName`}
                          component="div"
                          className="text-left text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="col-span-5">
                        <Field
                          type="date"
                          disabled={isReview}
                          name={`certifications.${index}.completionDate`}
                          placeholder="Completion Date"
                          className={`mt-1 block w-full px-3 py-2 border ${
                            errors.certifications?.[index]?.completionDate && touched.certifications?.[index]?.completionDate
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                        />
                        <ErrorMessage
                          name={`certifications.${index}.completionDate`}
                          component="div"
                          className="text-left text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={`ml-2 ${isReview ? 'text-gray-500 cursor-not-allowed' : 'text-red-500'}`}
                          disabled={isReview}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  ))}

                  {!isReview && (
                    <div className="flex items-start justify-start mt-4">
                      <button
                        type="button"
                        onClick={() => push({ certificationName: '', completionDate: '' })}
                        className="text-left bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                      >
                        <IoMdAddCircleOutline className="inline-block mr-2" />
                        Add Certification
                      </button>
                    </div>
                  )}
                </div>
              )}
            </FieldArray>

            <ConditionalRenderedComponent>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-300"
                  onClick={() => dispatch(changeStep(step - 1))}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
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

export default CertificationForm;
