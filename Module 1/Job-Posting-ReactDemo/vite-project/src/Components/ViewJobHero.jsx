import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobPostingById } from '../api/JobPosting';
import { FiArrowLeft } from 'react-icons/fi';

const ViewJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobPostingById(jobId);
        setJob(response.data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.response?.data?.detail || err.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getJobStatus = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate >= today ? 'Active' : 'Expired';
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading job details...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!job) return <div style={{ padding: '20px', textAlign: 'center' }}>Job not found</div>;

  return (
    <div className='hero-section' style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#008fd5',
          fontSize: '14px',
        }}
      >
        <FiArrowLeft size={16} />
        Back to Job Postings
      </button>

      <div style={{
        backgroundColor: 'white',
        color: '#000',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>

        {/* ✅ 2-Column Rows for First 3 Fields */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Job ID</h4>
            <p style={{ color: '#000' }}>J{job.job_id.toString().padStart(3, '0')}</p>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Application Deadline</h4>
            <p style={{ color: '#FF0000' }}><strong>{formatDate(job.application_deadline)}</strong></p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Position</h4>
            <p style={{ color: '#000' }}>{job.position}</p>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Employment Status</h4>
            <p style={{ color: '#000' }}>{job.employment_status || 'Not specified'}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Vacancy</h4>
            <p style={{ color: '#000' }}>{job.vacancy || 'Not specified'}</p>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#000' }}>Minimum Required Experience</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.experience || 'Not specified'}</p>
          </div>
        </div>

        {job.job_context && (
          <div>
            <h4 style={{ color: '#000' }}>Job Context</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.job_context}</p>
          </div>
        )}

        {job.job_requirements && (
          <div>
            <h4 style={{ color: '#000' }}>Job Requirements</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.job_requirements}</p>
          </div>
        )}

        {job.educational_requirements && (
          <div>
            <h4 style={{ color: '#000' }}>Educational Requirements</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.educational_requirements}</p>
          </div>
        )}

        {job.additional_requirements && (
          <div>
            <h4 style={{ color: '#000' }}>Additional Requirements</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.additional_requirements}</p>
          </div>
        )}

        <div>
          <h4 style={{ color: '#000' }}>Salary</h4>
          <p style={{ color: '#000' }}>{job.salary || 'Not specified'}</p>
        </div>

        <div>
          <h4 style={{ color: '#000' }}>Department</h4>
          <p style={{ color: '#000' }}>{job.department}</p>
        </div>

        {job.other_benefits && (
          <div>
            <h4 style={{ color: '#000' }}>Compensation & Other Benefits</h4>
            <p style={{ whiteSpace: 'pre-line', color: '#000' }}>{job.other_benefits}</p>
          </div>
        )}

        {/* ✅ Fixed Application Instruction */}
        <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#000' }}>
          If you think it might be for you and you have the required experience, please send your CV to <strong>recruitment.hr@sonaliintellect.com</strong>.
        </div>

        {/* ✅ Fixed Footer Info */}
        <div style={{
          marginTop: '40px',
          fontSize: '14px',
          color: '#000',
          lineHeight: '1.6',
          whiteSpace: 'pre-line',
        }}>
          <strong>Sonali Intellect Limited</strong>
          <br />
          Abedin Tower (Level-07), 35 Kemal Ataturk Avenue
          <br />
          Banani C/A, Dhaka-1213
          <br />
          <strong>
            URL: <a href="http://www.sonaliintellect.com" target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc' }}>www.sonaliintellect.com</a>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
