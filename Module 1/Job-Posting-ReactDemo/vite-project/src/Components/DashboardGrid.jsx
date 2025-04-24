import React from 'react';

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Leave Highlights</h2>
          <div className="flex justify-between items-center mb-2">
            <span>On Leave Today</span>
            <span className="text-2xl font-bold">5</span>
          </div>
          <button className="text-blue-600 text-sm">details &gt;</button>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Leave Taken</h2>
          <div className="flex items-end h-32 gap-2 mb-4">
            {[30, 20, 10, 12, 0].map((height, idx) => (
              <div key={idx} className="w-1/5 bg-blue-200" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => (
              <span key={idx}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Attendance Highlights</h2>
            <div className="flex justify-between items-center">
              <span>Present Today</span>
              <span className="text-2xl font-bold">5</span>
            </div>
            <button className="text-blue-600 text-sm mt-2">details &gt;</button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span>On Leave Tomorrow</span>
              <span className="text-2xl font-bold">10</span>
            </div>
            <button className="text-blue-600 text-sm">details &gt;</button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Pending Leave Application</span>
            <span className="text-2xl font-bold">345</span>
          </div>
          <button className="text-blue-600 text-sm">details &gt;</button>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Upcoming Holiday</h2>
          <div className="mb-2">26 Mar 25</div>
          <div className="space-y-1 text-sm text-gray-600">
            <div>- Casual</div>
            <div>- Sick</div>
            <div>- Earned</div>
            <div>- Other</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;