import React from 'react';
import { FiSearch } from 'react-icons/fi'; 

const Topbar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4">
      <h1 className="text-2xl font-bold mb-2 sm:mb-0 px-1">Dashboard</h1>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="bg-blue-100 text-black placeholder-black px-3 py-2 pl-10 rounded-full text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-black" />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
            <span className="text-sm sm:text-base font-medium">Admin Singh</span>
          </div>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white hover:shadow-lg transition-shadow duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
