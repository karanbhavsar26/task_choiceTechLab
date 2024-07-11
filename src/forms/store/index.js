import { configureStore } from '@reduxjs/toolkit';
import formReducer from "./formSlice"

const store = configureStore({
  reducer: {
    forms: formReducer,
    // Optionally add more reducers here
  },
  // Optionally add middleware, enhancers, and additional options
});

export default store;
