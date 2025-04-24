import React from 'react';

const Notifications = () => {
  const notifications = [
    { time: 'Just now', text: 'New office order' },
    { time: '59 minutes ago', text: 'New office order' },
    { time: '12 hours ago', text: 'New office order' },
    { time: 'Today, 11:59 AM', text: 'New office order' },
    { time: '14 Jan 2025, 11:59 AM', text: 'New office order' },
  ];

  return (
    <div className="mb-8">
      <h1 className="text-lg font-semibold mb-4">Notifications</h1>
      <div className="space-y-3">
        {notifications.map((notification, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span>{notification.text}</span>
            <span className="text-sm text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
      <hr className="border-t-2 mt-6" />
    </div>
  );
};

export default Notifications;