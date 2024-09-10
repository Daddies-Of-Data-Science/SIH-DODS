import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 text-black p-4">
      <h1 className="text-lg font-semibold mb-2 sm:mb-0">Dashboard</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white px-2 py-1 rounded text-sm w-full sm:w-auto"
        />
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-base">Admin Singh</span>
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=626&ext=jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
