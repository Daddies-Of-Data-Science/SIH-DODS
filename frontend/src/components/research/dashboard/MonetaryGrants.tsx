// src/components/MonetaryGrants.tsx
import React from "react";

const MonetaryGrants: React.FC = () => {
  const grants = [
    { source: "TATA Foundation", amount: 2, color: "bg-blue-500" },
    { source: "Incubation Fund", amount: 1, color: "bg-purple-500" },
    { source: "Others", amount: 1, color: "bg-green-500" },
  ];

  const totalAmount = grants.reduce((sum, grant) => sum + grant.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Monetary Grants</h3>
      <div className="flex items-center justify-between">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative">
          <div className="text-center">
            <span className="text-2xl font-bold">{totalAmount}</span> Lakhs
          </div>
          {/* You can later add an actual chart library like D3.js for a pie chart */}
        </div>
        <ul className="flex-1 ml-6 space-y-2">
          {grants.map((grant, idx) => (
            <li key={idx} className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${grant.color}`}
              ></span>
              {grant.source}: {grant.amount} Lakhs
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonetaryGrants;
