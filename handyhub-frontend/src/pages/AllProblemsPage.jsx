import React, { useState, useEffect } from 'react';
import './AllProblemsPage.css';
import { getAllSubcategories } from '../data/categories';
import ProblemService from '../services/problem.service'; // Import ProblemService
import AuthService from '../services/auth.service';

const AllProblemsPage = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const availableCategories = getAllSubcategories();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        const user = AuthService.getCurrentUser();
        if (!user || !user.token) {
          setError("You must be logged in to view all tasks.");
          setLoading(false);
          setAllProblems([]);
          return;
        }

        // Pass the token to the service method
        const response = await ProblemService.getAllProblems(user.token);
        // Ensure problems have a status; backend should ideally handle default
        const problemsWithStatus = response.data.map(p => ({ ...p, status: p.status || 'Pending' }));
        setAllProblems(problemsWithStatus.sort((a, b) => Number(b.id) - Number(a.id))); // Sort by ID descending (most recent first)
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to load tasks. Please try again later.");
        setAllProblems([]); // Clear problems on error
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filteredProblems = allProblems.filter(problem => {
    const desc = problem.description?.toLowerCase() || '';
    const cat = problem.category?.toLowerCase() || '';
    const loc = problem.location?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchesSearch = desc.includes(search) || cat.includes(search) || loc.includes(search);
    const matchesCategory = selectedCategory ? problem.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      // Backend LocalDateTime format needs parsing
      // Example: "2023-10-27T10:30:00"
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error parsing date:", dateString, e);
      return dateString; // Return original if parsing fails
    }
  };


  if (loading) return <div className="page-container all-problems-page"><p>Loading tasks...</p></div>;
  if (error) return <div className="page-container all-problems-page"><p className="error-message">{error}</p></div>;


  return (
    <div className="page-container all-problems-page">
      <h1>Browse All Available Tasks</h1>
      <div className="filters-container">
        <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {filteredProblems.length === 0 ? (
         <p className="no-results-message">No tasks match your criteria or none posted yet.</p>
      ) : (
        <div className="problem-list">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className={`problem-card all-problem-card status-${problem.status ? problem.status.toLowerCase() : 'unknown'}`}>
              <h3>{problem.category}</h3>
              <p className="problem-description">{problem.description}</p>
              <p><strong>Location:</strong> {problem.location}</p>
              <p><strong>Contact:</strong> {problem.phone}</p>
              <p><small>Posted on: {formatDate(problem.datePosted)}</small></p> {/* Display formatted date */}
              <p className="problem-status-indicator">
                Status: <span className={`status-text status-text-${problem.status ? problem.status.toLowerCase() : 'unknown'}`}>{problem.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProblemsPage;
