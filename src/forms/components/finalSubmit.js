import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Thank You!</h2>
        <p className="text-lg text-gray-800 mb-8 text-center">
          Your form has been successfully submitted.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
