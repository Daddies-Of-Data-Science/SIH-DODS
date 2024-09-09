import React from "react";

const HomePage: React.FC = () => {
  const handleDashboardClick = () => {
   
    console.log("Redirecting to dashboard...");
    window.location.href = "/research/dashboard"; 
  };

  return (
    <div className="relative h-screen bg-blue-50 flex flex-col items-center justify-center">
      <div className="text-center z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          CENTRALIZED HUB FOR MANAGING RESEARCH ACTIVITIES
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Seamless Project Submission, Tracking, and Detailed Overviews
        </p>
        <button
          onClick={handleDashboardClick}
          className="px-6 py-3 bg-blue-600 text-white text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          View Dashboard
        </button>
      </div>

     
      <div className="absolute top-10 left-10 h-20 w-20 md:h-40 md:w-40 rounded-full bg-blue-300 opacity-80" />
      <div className="absolute top-20 right-10 h-10 w-10 md:h-16 md:w-16 rounded-full bg-yellow-400 opacity-80" />
      <div className="absolute bottom-32 right-10 h-20 w-20 md:h-40 md:w-40 rounded-full bg-green-400 opacity-80" />
      <div className="absolute bottom-16 left-20 h-16 w-16 md:h-24 md:w-24 rounded-full bg-red-400 opacity-80" />
      <div className="absolute top-40 left-40 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-600 opacity-80" />
      {/* <div className="absolute top-72 right-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-500 opacity-80" /> */}
    </div>
  );
};

export default HomePage;
