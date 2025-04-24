
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { 
  getJobPostingById, 
  updateJobPosting 
} from "../../api/JobPosting.js";
import Header from '../../Components/Header';
import LeftPanel from '../../Components/LeftPanel';
import RightPanel from '../../Components/RightPanel';

const EditJobPostingHero = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: '',
    vacancy: '',
    jobContext: '',
    jobRequirements: '',
    employmentStatus: 'Full-time',
    educationalRequirements: '',
    additionalRequirements: '',
    experience: '',
    salary: '',
    department: '',
    otherBenefits: '',
    applicationDeadline: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobPostingById(jobId);
        const job = response.data;
        setFormData({
          position: job.position,
          vacancy: job.vacancy,
          jobContext: job.job_context || '',
          jobRequirements: job.job_requirements || '',
          employmentStatus: job.employment_status,
          educationalRequirements: job.educational_requirements || '',
          additionalRequirements: job.additional_requirements || '',
          experience: job.experience || '',
          salary: job.salary || '',
          department: job.department,
          otherBenefits: job.other_benefits || '',
          applicationDeadline: job.application_deadline
        });
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formattedData = {
        position: formData.position,
        vacancy: formData.vacancy.toString(),
        job_context: formData.jobContext,
        job_requirements: formData.jobRequirements,
        employment_status: formData.employmentStatus,
        educational_requirements: formData.educationalRequirements,
        additional_requirements: formData.additionalRequirements,
        experience: formData.experience,
        salary: formData.salary,
        department: formData.department,
        other_benefits: formData.otherBenefits,
        application_deadline: formData.applicationDeadline
      };
      
      console.log('Submitting:', formattedData); // For debugging
      
      await updateJobPosting(jobId, formattedData);
      navigate('/recruitment');
    } catch (err) {
      console.error('Error updating job:', err);
      
      // Improved error handling
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.detail;
        if (Array.isArray(validationErrors)) {
          setError(validationErrors.map(err => `${err.loc[1]}: ${err.msg}`).join('\n'));
        } else {
          setError(validationErrors || 'Validation failed');
        }
      } else {
        setError(err.response?.data?.message || 'Failed to update job posting');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero-section" style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {/* Basic Information Section */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Position */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
              required
            />
          </div>

          {/* Number of Vacancies */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Number of Vacancies</label>
            <input
              type="text"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
              required
            />
          </div>
        </div>

        {/* Job Context */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#333'
          }}>Job Context</h3>
          <textarea
            name="jobContext"
            value={formData.jobContext}
            onChange={handleChange}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#f8f8f8',
              color: '#000000'
            }}
          />
        </div>

        {/* Job Requirements */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#333'
          }}>Job Requirements</h3>
          <textarea
            name="jobRequirements"
            value={formData.jobRequirements}
            onChange={handleChange}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#f8f8f8',
              color: '#000000'
            }}
          />
        </div>

        {/* Additional Fields Section */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Employment Status */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Employment Status</label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contractual</option>
            </select>  
          </div>

          {/* Educational Requirements */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Educational Requirements</label>
            <textarea
              name="educationalRequirements"
              value={formData.educationalRequirements}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                minHeight: '80px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
            />
          </div>

          {/* Additional Requirements */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Additional Requirements</label>
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                minHeight: '80px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
            />
          </div>

          {/* Minimum Required Experience */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Minimum Required Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
            />
          </div>

          {/* Salary */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
              required
            >
              <option value="">Select Department</option>
              <option value="BD">Business Development</option>
              <option value="F&A">Finance & Accounts</option>
              <option value="IT">Information Technology</option>
              <option value="RnD">Research & Development</option>
              <option value="HR&Admin">HR & Administration</option>
              <option value="MGT">Management</option>
              <option value="Non-MGT">Non - Management</option>
              <option value="Non-MGT">Not Disclosed</option>
            </select>
          </div>
        </div>

        {/* Other Benefits */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#333'
          }}>Other Benefits</h3>
          <textarea
            name="otherBenefits"
            value={formData.otherBenefits}
            onChange={handleChange}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#f8f8f8',
              color: '#000000'
            }}
          />
        </div>

        {/* Application Deadline */}
        <div style={{ marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f8f8',
                color: '#000000'
              }}
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
          marginTop: '30px'
        }}>
          <button
            type="button"
            onClick={() => navigate('/recruitment')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              backgroundColor: isSubmitting ? '#cccccc' : '#008fd5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiSave size={14} />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function EditJobPosting() {
  return (
    <>
      <Header breadcrumb={['Home', 'Recruitment', 'Edit Job']} />
      <div className="main-layout">
        <LeftPanel />
        <EditJobPostingHero />
        <RightPanel />
      </div>
    </>
  );
}