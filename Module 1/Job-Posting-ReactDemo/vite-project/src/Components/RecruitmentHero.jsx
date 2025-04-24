import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { 
  getAllJobPostings, 
  deleteJobPosting,
  getJobPostingById
} from "../api/JobPosting.js";

const RecruitmentHero = () => {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobPostings();
        setJobPostings(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job postings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const handleAddNew = () => {
    navigate('/recruitment/add-new-job');
  };

  const handleView = async (jobId) => {
    try {
      const response = await getJobPostingById(jobId);
      if (response.data) {
        navigate(`/recruitment/view-job/${jobId}`);
      } else {
        throw new Error('Job not found');
      }
    } catch (error) {
      console.error('Error viewing job:', error);
      alert(error.response?.data?.detail || error.message || 'Failed to load job details');
    }
  };


  const handleEdit = (jobId) => {
    navigate(`/recruitment/edit-job/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteJobPosting(jobId);
        setJobPostings(prev => prev.filter(job => job.job_id !== jobId));
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job posting');
      }
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper to determine status
  const getJobStatus = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate >= today ? 'Active' : 'Expired';
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading job postings...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div className="recruitment-hero" style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#333', margin: 0 }}>All Job Posting</h3>
        <button 
          onClick={handleAddNew}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 16px',
            backgroundColor: '#008fd5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          <FiPlus size={16} />
          Add New Job
        </button>
      </div>
      
      <div style={{
        overflowX: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#F8F8F8',
              borderBottom: '1px solid #e0e0e0',
            }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Position</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Department</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Deadline</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Min Experience</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '500', color: '#000000' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((job) => (
              <tr key={job.job_id} style={{
                borderBottom: '1px solid #e0e0e0',
                ':hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}>
                <td style={{ padding: '12px 16px', color: '#000000' }}>J{job.job_id.toString().padStart(3, '0')}</td>
                <td style={{ padding: '12px 16px', color: '#000000' }}>{job.position}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: getJobStatus(job.application_deadline) === 'Active' ? '#E8F5E9' : '#FFEBEE',
                    color: getJobStatus(job.application_deadline) === 'Active' ? '#2E7D32' : '#C62828',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}>
                    {getJobStatus(job.application_deadline)}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#000000' }}>{job.department}</td>
                <td style={{ padding: '12px 16px', color: '#000000' }}>
                  {formatDate(job.application_deadline)}
                </td>
                <td style={{ padding: '12px 16px', color: '#000000', textAlign: 'center' }}>
                  {job.experience || 'N/A'}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleView(job.job_id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#4CAF50',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                      }}
                      title="View"
                    >
                      <FiEye size={16} />
                    </button>
                    <button 
                      onClick={() => handleEdit(job.job_id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#2196F3',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                      }}
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(job.job_id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#F44336',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px',
                      }}
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitmentHero;