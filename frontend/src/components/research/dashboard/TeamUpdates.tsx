
import React from "react";

const TeamUpdates: React.FC = () => {
  const updates = [
    {
      priority: "Medium",
      message: "Add more user avatars",
      date: "Mar 3, 2020",
      avatars: [
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
        "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?size=626&ext=jpg", 
      ],
    },
    {
      priority: "Low",
      message: "Add 'Pinned' section at top of the board",
      date: "Mar 3, 2020",
      avatars: [
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1299107749.1725978024&semt=ais_hybrid",
      ],
    },
  ];

  const priorityColors: { [key: string]: string } = {
    Medium: "bg-yellow-700",
    Low: "bg-green-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Team Updates</h3>
      <ul className="space-y-4">
        {updates.map((update, idx) => (
          <li key={idx} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 text-sm font-semibold text-white rounded ${priorityColors[update.priority]}`}
              >
                {update.priority}
              </span>
              <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <p className="text-sm">{update.message}</p>
            <div className="mt-2 flex -space-x-2">
              {update.avatars.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamUpdates;
