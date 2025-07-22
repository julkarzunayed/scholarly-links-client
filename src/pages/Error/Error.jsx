import React from 'react';
import Lottie from 'lottie-react'; // Import the Lottie component
// You can either import the JSON directly if it's in your project,
// or use a URL as shown below. For simplicity, we'll use a URL.
import errorAnimationData from '../../assets/error.json'; 

const Error = () => {
  // Lottie animation options
  const defaultOptions = {
    loop: true, // Animation will loop infinitely
    autoplay: true, // Animation will play automatically
    animationData: errorAnimationData, // Your Lottie JSON URL
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // Maintain aspect ratio
    }
  };

  // Function to handle going back (e.g., to home page)
  const handleGoHome = () => {
    // You would typically use React Router's navigate function here
    // For example: navigate('/'); or window.location.href = '/';
    alert('Navigating back to home page (simulated)'); // Replace with actual navigation
    window.location.href = '/'; // Simple redirect for demonstration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="w-64 h-64 mx-auto mb-6">
          {/* Lottie animation component */}
          <Lottie 
            animationData={defaultOptions.animationData} 
            loop={defaultOptions.loop} 
            autoplay={defaultOptions.autoplay} 
            style={{ width: '100%', height: '100%' }} // Ensure Lottie takes full size of its container
          />
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Oops! Something Went Wrong.
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Error;
