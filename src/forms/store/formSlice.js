import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'formSlice',
  initialState: {
    step: 0,
    data:{
        personal_details:{ name: '', email: '', phone: '', address: '' },
        education_details:{
            ssc: { name: 'SSC', board: '', cgpa: '', year: '' },
            hsc: { name: 'HSC', board: '', cgpa: '', year: '' },
            graduation: { name: 'Graduation', board: '', cgpa: '', year: '' },
            postGraduation: { name: 'Post Graduation', board: '', cgpa: '', year: '' },
          },
        working_details:{
            experiences: [
              { company: '', jobTitle: '', duration: '' }
            ]
          },
          skills_and_certification:{
            certifications: [{ certificationName: '', completionDate: '' }],
            skills: [], 
          },
          additional_details:{  coverLetter: null ,resume:null}
    },
    selectedSkills:[]
  },
  reducers: {
    changeStep(state,action) {
      state.step =action.payload;
    },
    setData(state,action) {
        state.data =action.payload;
      },
      setSelectedSkills(state,action) {
        state.selectedSkills =action.payload;
      },
  },
});

export const { changeStep,setData,setSelectedSkills } = formSlice.actions;
export default formSlice.reducer;
