import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo1.jpg';
import profileIcon from '../assets/images/profile-icon.png';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const profile = 'Liton';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic breadcrumb generator
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = ['Home']; // Always start with Home

    pathnames.forEach((path, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const formattedPath = path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
      breadcrumbs.push(formattedPath);
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${hours}:${minutes} ${ampm} / ${day} ${month} ${year}`;
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={logo} alt="Logo" style={{ height: '55px'}} />
        
        {/* Dynamic Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <span style={{ 
                color: index === breadcrumbs.length - 1 ? '#333' : '#6c757d',
                fontWeight: index === breadcrumbs.length - 1 ? 'bold' : 'normal'
              }}>
                {item}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span style={{ margin: '0 8px', color: '#6c757d' }}>/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div>
          <span>{formatTime(currentTime)}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src={profileIcon} 
            alt="Profile" 
            style={{ 
              height: '36px', 
              width: '36px',
              borderRadius: '50%'
            }} 
          />
          <span style={{ fontWeight: 'bold' }}>Welcome {profile}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;