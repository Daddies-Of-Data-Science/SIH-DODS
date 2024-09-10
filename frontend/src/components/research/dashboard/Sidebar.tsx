
import React from 'react';

const Sidebar: React.FC = () => {
  const icons = ['bitcoin', 'chart', 'document', 'setting'];

  return (
    <div className="w-20 h-full bg-gray-900 p-4 flex flex-col items-center space-y-6 mt-[12vh]">
      {icons.map((icon, idx) => (
        <button key={idx} className="text-white hover:text-yellow-500">
          {/* Assuming you import an icon set like react-icons */}
          <span className="material-icons">{icon}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
