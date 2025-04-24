import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiEye } from 'react-icons/fi';
import { createJobPosting } from "../api/JobPosting.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewJobPostingHero() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
   
    position: '',
    vacancies: '',
    jobContext: '',
    jobRequirements: '',
    employmentStatus: 'Full-time',
    educationRequirements: '',
    additionalRequirements: '',
    minExperience: '',
    salary: '',
    department: '',
    otherBenefits: '',
    deadline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handlePreview = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowPreview(true); // Show the preview modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
  
    try {
      const formattedData = {
        position: formData.position || '',
        vacancy: formData.vacancies?.toString() || '0',
        job_context: formData.jobContext || null,
        job_requirements: formData.jobRequirements || null,
        employment_status: formData.employmentStatus || '',
        educational_requirements: formData.educationRequirements || null,
        additional_requirements: formData.additionalRequirements || null,
        experience: formData.minExperience || null,
        salary: formData.salary || null,
        other_benefits: formData.otherBenefits || null,
        application_deadline: new Date(formData.deadline).toISOString().split("T")[0],
        department: formData.department || ''
      };
  
      console.log('Submitting:', formattedData);
  
      const response = await createJobPosting(formattedData);
      console.log('Job created:', response.data);
      navigate('/recruitment');
    } catch (err) {
      console.error('Error creating job:', err);
      setError(err.response?.data?.detail || 'Failed to create job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero-section" style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', margin: 0 }}>New Job Posting</h2>
        <button 
          onClick={() => navigate('/recruitment')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <FiArrowLeft size={16} />
          Back to Jobs
        </button>
      </div>

        <form onSubmit={handlePreview} style={{ 
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
         

          {/* 2. Position */}
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

          {/* 3. Number of Vacancies */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Number of Vacancies</label>
            <input
              type="text"
              name="vacancies"
              value={formData.vacancies}
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

        {/* 4. Job Context */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#000'
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

        {/* 5. Job Requirements */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#000'
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
          {/* 6. Employment Status */}
          
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Employment Status</label>
            <br/>
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

          {/* 7. Educational Requirements */}
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Educational Requirements</label>
            <textarea
              name="educationRequirements"
              value={formData.educationRequirements}
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

          {/* 8. Additional Requirements */}
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

          {/* 9. Minimum Required Experience */}
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

          {/* 10. Salary */}
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

          {/* 11. Department */}
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

        {/* 12. Other Benefits */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#000'
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

        {/* 13. Application Deadline */}
        <div style={{ marginBottom: '30px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Application Deadline</label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#000',
                  appearance: 'auto',
                  WebkitAppearance: 'auto',
                  MozAppearance: 'auto',
                  cursor: 'pointer'
                }}
                required
              />
              <label 
                htmlFor="deadline"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none"
                }}
              >
                📅
              </label>
            </div>
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
  style={{
    padding: '12px 24px',
    backgroundColor: '#008fd5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
>
  <FiEye size={14} />
  Preview
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            width: '80%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Job Posting Preview</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Position</h3>
              <p>{formData.position}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Number of Vacancies</h3>
              <p>{formData.vacancies}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Job Context</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{formData.jobContext}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Job Requirements</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{formData.jobRequirements}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Employment Status</h3>
              <p>{formData.employmentStatus}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Educational Requirements</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{formData.educationRequirements}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Additional Requirements</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{formData.additionalRequirements}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Minimum Required Experience</h3>
              <p>{formData.minExperience}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Salary</h3>
              <p>{formData.salary}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Department</h3>
              <p>{formData.department}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Other Benefits</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{formData.otherBenefits}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '8px', color: '#555' }}>Application Deadline</h3>
              <p>{formData.deadline}</p>
            </div>

            {error && (
              <div style={{ color: 'red', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              marginTop: '30px'
            }}>
              <button
                onClick={() => setShowPreview(false)}
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
                Back to Edit
              </button>
              <button
  onClick={handleSubmit}  // This will now handle the actual submission
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
  {isSubmitting ? 'Posting...' : 'Confirm and Post Job'}
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}