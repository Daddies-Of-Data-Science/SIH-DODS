import React from "react";
import PublicationsChart from "./Publications";
import MonetaryGrants from "./MonetaryGrants";
import Patents from "./Patents";
import Notifications from "./Notifications";
import TeamUpdates from "./TeamUpdates";
import { Link } from "react-router-dom";

const DashboardContent: React.FC = () => {
  return (
    <div className="p-6 flex flex-col space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0">
        <div className="flex flex-col">
          <h2 className="text-2xl">Welcome, Aaditya</h2>
          <div className="flex space-x-2 mt-2">
            <p className="my-1 font-bold md:text-lg text-sm">Your area of Interest:</p>
            <span className="bg-green-500 text-white px-2 py-1 rounded">
              Education
            </span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">
              Technology
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/research" className="bg-green-500 text-white px-4 py-2 rounded">
            Find New Collaborators
          </Link>
          <Link to="/research" className="bg-blue-500 text-white px-4 py-2 rounded">
            Find New Grants
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PublicationsChart/>
        <MonetaryGrants />
        <Patents />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Notifications />
        <TeamUpdates />
      </div>
    </div>
  );
};

export default DashboardContent;
