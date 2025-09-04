import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostProblemPage.css';
import { serviceCategories } from '../data/categories';
import ProblemService from '../services/problem.service';
import AuthService from '../services/auth.service'; // ✅ added import

const PostProblemPage = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (!category || !description || !location || !phone) {
      setMessage('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    const newProblem = { category, description, location, phone };

    try {
      const user = AuthService.getCurrentUser();   // ✅ get current user
      const token = user?.token;                   // ✅ extract token
      const response = await ProblemService.createProblem(newProblem, token); // ✅ pass token
      console.log('Problem submitted successfully:', response.data);

      setMessage(`Problem "${response.data.description}" submitted successfully!`);

      // Clear form
      setCategory('');
      setDescription('');
      setLocation('');
      setPhone('');
    } catch (error) {
      console.error("Error submitting problem:", error.response ? error.response.data : error.message);
      setMessage('Error submitting problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-problem-page container">
      <h1>Post a New Problem</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a Category</option>
            {serviceCategories.map((mainCat) => (
              <optgroup label={mainCat.name} key={mainCat.name}>
                {mainCat.subcategories.map((subCat) => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the problem in detail" required/>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 123 Main St, Anytown" required/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g., 555-123-4567" pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}" title="Phone number (e.g., 123-456-7890 or 1234567890)" required/>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Problem'}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', textAlign: 'center', color: message.toLowerCase().includes('error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      {typeof message === 'string' && message.toLowerCase().includes('successfully!') && (
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={() => navigate('/my-problems')}>View My Posted Problems</button>
          <button onClick={() => navigate('/all-problems')} style={{marginLeft: '10px'}}>Browse All Tasks</button>
        </p>
      )}
    </div>
  );
};

export default PostProblemPage;
