
import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5500', // Your FastAPI server port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job Posting API
export const createJobPosting = (jobData) => API.post('/jobs/', jobData);
export const getAllJobPostings = () => API.get('/getjobs/');
export const getJobPostingById = (jobId) => API.get(`/getjobs/${jobId}`);
export const updateJobPosting = (jobId, jobData) => API.put(`/updatejobs/${jobId}`, jobData);
export const deleteJobPosting = (jobId) => API.delete(`/Deletejobs/${jobId}`);
