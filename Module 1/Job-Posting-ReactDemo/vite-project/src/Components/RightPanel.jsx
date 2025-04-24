
import React from 'react';
import UploadIcon from '../assets/images/Notification.png'; // Import your upload icon image

const notifications = [
  { time: 'Just now', text: 'New office order' },
  { time: '59 minutes ago', text: 'New office order' },
  { time: '12 hours ago', text: 'New office order' },
  { time: 'Today, 11:59 AM', text: 'New office order' },
  { time: '14 Jan 2025, 11:59 AM', text: 'New office order' }
];

const RightPanel = () => {
  return (
    <div className="right-panel" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Notifications</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map((note, index) => (
          <li 
            key={index} 
            style={{ 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              paddingBottom: '15px',
              borderBottom: index < notifications.length - 1 ? '1px solid #eee' : 'none'
            }}
          >
            <img 
              src={UploadIcon} 
              alt="Upload" 
              style={{ 
                width: '25px', 
                height: '25px',
                marginTop: '2px'
              }} 
            />
            <div>
              <strong style={{ display: 'block', marginBottom: '4px' }}>{note.text}</strong>
              <small style={{ color: '#666', fontSize: '0.8rem' }}>{note.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightPanel;
