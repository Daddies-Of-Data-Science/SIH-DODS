
import React from 'react';

const Notifications: React.FC = () => {
  const notifications = [
    { type: "success", text: "IEEE Publication successful - 16th August 2024" },
    { type: "warning", text: "2 days remaining: Spring Publication Review Deadline" },
    { type: "info", text: "Team Member: Aryan - Review Request" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <ul>
        {notifications.map((note, idx) => (
          <li key={idx} className={`p-2 mb-2 ${note.type === 'success' ? 'bg-green-100' : note.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'} rounded`}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
