import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProblemsPage.css';
import ProblemService from '../services/problem.service';
import AuthService from '../services/auth.service';

const MyProblemsPage = () => {
  const [myProblems, setMyProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyProblems = async () => {
    setLoading(true);
    setError(null);

    const user = AuthService.getCurrentUser();
    if (!user || !user.token) {
      setError("You are not logged in. Please log in to view your problems.");
      setLoading(false);
      return;
    }

    try {
      const response = await ProblemService.getMyProblems(user.token);
      console.log("Fetched My Problems:", response.data);
      const problemsWithStatus = response.data.map(p => ({ ...p, status: p.status || 'Pending' }));
      setMyProblems(problemsWithStatus.sort((a, b) => Number(b.id) - Number(a.id))); // Sort by ID descending (most recent first)
    } catch (err) {
      console.error("Error loading my problems:", err.response ? err.response.data : err.message);
      setError("Failed to load your tasks. Please ensure you are logged in and backend is running.");
      setMyProblems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProblems();
  }, []);

  const updateProblemStatusHandler = async (problemId, newStatus) => {
    const user = AuthService.getCurrentUser();
    if (!user || !user.token) {
        alert("You must be logged in to update a problem's status.");
        return;
    }
    
    try {
      await ProblemService.updateProblemStatus(problemId, newStatus, user.token);

      setMyProblems(prevProblems =>
        prevProblems.map(p => p.id === problemId ? { ...p, status: newStatus } : p)
      );
      alert(`Problem status updated to '${newStatus}'!`);
    } catch (err) {
      console.error("Error updating problem status:", err.response ? err.response.data : err.message);
      setError("Failed to update status. Please try again.");
      alert("Failed to update status. Please try again.");
    }
  };

  const handleDeleteProblemHandler = async (problemId) => {
    const user = AuthService.getCurrentUser();
    if (!user || !user.token) {
        alert("You must be logged in to delete a problem.");
        return;
    }

    if (window.confirm("Are you sure you want to delete this problem? This action cannot be undone.")) {
      try {
        await ProblemService.deleteProblem(problemId, user.token);
        setMyProblems(prevProblems => prevProblems.filter(p => p.id !== problemId));
        alert("Problem deleted successfully!");
      } catch (err) {
        console.error("Error deleting problem:", err.response ? err.response.data : err.message);
        setError("Failed to delete problem. Please try again.");
        alert("Failed to delete problem. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error parsing date:", dateString, e);
      return dateString;
    }
  };

  if (loading) {
    return <div className="page-container my-problems-page"><p>Loading your problems...</p></div>;
  }

  if (error) {
    return <div className="page-container my-problems-page"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="page-container my-problems-page">
      <h1>My Posted Problems</h1>
      {myProblems.length === 0 ? (
        <div className="no-problems-message">
          <p>You haven't posted any problems yet.</p>
          <Link to="/post-problem" className="post-new-problem-button">
            Post Your First Problem
          </Link>
        </div>
      ) : (
        <div className="problem-list">
          {myProblems.map((problem) => (
            <div key={problem.id} className={`problem-card my-problem-card status-${problem.status ? problem.status.toLowerCase() : 'unknown'}`}>
              <h3>{problem.category}</h3>
              <p>{problem.description}</p>
              <p><strong>Location:</strong> {problem.location}</p>
              <p><strong>Contact:</strong> {problem.phone}</p>
              <p><small>Posted on: {formatDate(problem.datePosted)}</small></p> {/* Display formatted date */}
              <p className="problem-status">
                <strong>Status:</strong> <span className={`status-text-${problem.status ? problem.status.toLowerCase() : 'unknown'}`}>{problem.status}</span>
              </p>
              <div className="problem-actions">
                {problem.status === 'Pending' && (
                  <button
                    className="status-button solved-button"
                    onClick={() => updateProblemStatusHandler(problem.id, 'Solved')}
                  >
                    Mark as Solved
                  </button>
                )}
                {problem.status === 'Solved' && (
                  <button
                    className="status-button pending-button"
                    onClick={() => updateProblemStatusHandler(problem.id, 'Pending')}
                  >
                    Mark as Pending
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProblemHandler(problem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProblemsPage;
