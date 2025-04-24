import React from 'react';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        <Box title="On Leave Today" value="5" />
        <Box title="On Leave Tomorrow" value="10" />
        <Box title="Pending Leave Application" value="345" />
        <Box title="Upcoming Holiday" value="26 Mar 25" />
        <Box title="Present Today" value="5" />
        <Box title="Absent Today" value="10" />
        <Box title="Absent This Week" value="34" />
        <Box title="Absent This Month" value="345" />
      </div>
    </div>
  );
};

const Box = ({ title, value }) => (
  <div style={{
    flex: '1 0 200px',
    padding: '20px',
    backgroundColor: '#F8F8F8',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(146, 53, 53, 0.05)'
  }}>
    <h4 style={{ color: '#888888', marginBottom: '10px' }}>{title}</h4> {/* Light gray title */}
    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000' }}>{value}</p> {/* Black value */}
  </div>
);


export default HeroSection;
