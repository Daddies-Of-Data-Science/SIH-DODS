
import React from "react";

const Patents: React.FC = () => {
  const totalPatents = 30;
  const publishedPatents = 18;
  const inReviewPatents = totalPatents - publishedPatents;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Total Patents</h3>
      <div className="text-3xl font-bold mb-4">{totalPatents}</div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Published</span>
          <span>{publishedPatents}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(publishedPatents / totalPatents) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>In Review</span>
          <span>{inReviewPatents}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${(inReviewPatents / totalPatents) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Patents;
