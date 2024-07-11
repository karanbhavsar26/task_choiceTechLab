import React from 'react';
import PersonalInformationForm from './personalInformation';
import EducationForm from './educationDetails';
import WorkExperienceForm from './workExperience';
import CertificationForm from './skillAndCertification';
import AdditionalDetailsForm from './additionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { changeStep, setData } from '../store/formSlice';

const Review = () => {
  const dispatch=useDispatch()
  const step = useSelector((state) => state?.forms?.step);

  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
        <p className="text-gray-600">
          Please review the information you have provided below before submitting.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
        <PersonalInformationForm isReview={true}/>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Education Details</h3>
        <EducationForm isReview={true}/>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Work Experience</h3>
        <WorkExperienceForm isReview={true}/>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Skills and Certifications</h3>
        <CertificationForm isReview={true}/>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Additional Details</h3>
        <AdditionalDetailsForm isReview={true}/>
      </div>
      <div className='flex gap-2'>
            <button type="button" className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-300" onClick={()=>dispatch(changeStep(step-1))}>
              Previous
            </button>
            <button type="button" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={()=>dispatch(changeStep(step+1))}>
              Submit
            </button>
            </div>
    </div>
  );
};

export default Review;
