import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '../assets/images/Dashboard icon.png';
import AttendanceIcon from '../assets/images/Attendance icon.png';
import PayrollIcon from '../assets/images/Payroll icon.png';
import EmployeesIcon from '../assets/images/Employees icon.png';
import TaxesIcon from '../assets/images/Taxes.png';
import ProvidentFundIcon from '../assets/images/Provident Fund icon.png';
import RecruitmentIcon from '../assets/images/Recruitment.png';
import CommunicationsIcon from '../assets/images/communication.png';
import ReportsIcon from '../assets/images/Reports.png';
import SettingsIcon from '../assets/images/Settings.png';

const menuItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/" },
  { name: "Attendance", icon: AttendanceIcon, path: "/attendance" },
  { name: "Payroll", icon: PayrollIcon, path: "/payroll" },
  { name: "Employees", icon: EmployeesIcon, path: "/employees" },
  { name: "Taxes", icon: TaxesIcon, path: "/taxes" },
  { name: "Provident Fund", icon: ProvidentFundIcon, path: "/provident-fund" },
  { name: "Recruitment", icon: RecruitmentIcon, path: "/recruitment" },
  { name: "Communications", icon: CommunicationsIcon, path: "/communications" },
  { name: "Reports", icon: ReportsIcon, path: "/reports" },
  { name: "Settings", icon: SettingsIcon, path: "/settings" }
];

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="left-panel">
      <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
        {menuItems.map(item => (
          <li 
            key={item.name} 
            onClick={() => navigate(item.path)}
            style={{ 
              marginBottom: '15px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '3px',
              borderRadius: '4px',
              ':hover': {
                backgroundColor: '#f0f0f0'
              }
            }}
          >
            <img 
              src={item.icon} 
              alt={item.name} 
              style={{ width: '16px', height: '16px' }} 
            />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPanel;