import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import './Feedback.css';

const Feedback = () => {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [feedback, setFeedback] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [replyConfirmedId, setReplyConfirmedId] = useState(null);
  const [viewFeedback, setViewFeedback] = useState(null);
  const [replyModalData, setReplyModalData] = useState(null);
  const [replyText, setReplyText] = useState('');
  const dropdownRef = useRef(null);

  // Fetch feedback from backend on mount
  const fetchFeedback = () => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => {
       const mappedFeedback = data.map((item, index) => ({
  id: item.id || `FB-${index + 1}`,
  customer: item.name || 'Customer',
orderId: item.orderId || 'N/A',
  rating: item.rating,
  comment: item.comment,
  date: item.date ? new Date(item.date).toLocaleDateString() : new Date().toLocaleDateString(),
  status: item.status || 'Pending',
}));


        setFeedback(mappedFeedback);
      })
      .catch(err => console.error('Error fetching feedback:', err));
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Close dropdown if click outside (but not inside dropdown)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleView = (fb) => setViewFeedback(fb);

  const handleReplyClick = (fb) => {
    setReplyModalData(fb);
    setReplyText('');
    setOpenDropdownId(null);
  };

  // Send reply to backend and update local state
 const handleSendReply = () => {
  if (!replyText.trim()) return;

  fetch(`http://localhost:5001/api/reviews/${replyModalData.id}/reply`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reply: replyText }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to send reply');
      return res.json();
    })
    .then(() => {
      fetchFeedback(); // feedback reload karo jisse reply dikhe
      setReplyConfirmedId(replyModalData.id);
      setReplyModalData(null);
      setTimeout(() => setReplyConfirmedId(null), 2500);
    })
    .catch(err => {
      console.error(err);
      alert('Error sending reply');
    });
};

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      fetch(`http://localhost:5001/api/reviews/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete feedback');
          // Update frontend list after deletion
          setFeedback(prev => prev.filter(fb => fb.id !== id));
          setOpenDropdownId(null);
        })
        .catch(err => {
          console.error(err);
          alert('Error deleting feedback');
        });
    }
  };

  const handleDotsClick = (id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
  };

  const closeModal = () => setViewFeedback(null);
  const closeReplyModal = () => setReplyModalData(null);

  const filteredFeedback = feedback
    .filter(fb => {
      const matchesSearch =
        fb.customer.toLowerCase().includes(search.toLowerCase()) ||
        fb.orderId.toLowerCase().includes(search.toLowerCase()) ||
        fb.comment.toLowerCase().includes(search.toLowerCase());

      const matchesRating = ratingFilter === 'All Ratings' || fb.rating === Number(ratingFilter);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) =>
      sortOrder === 'Newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  return (
    <div className="feedback-page">
      <div className="feedback-inner">
        <h1>Feedback</h1>
        <p>View and respond to customer feedback and reviews</p>

        <div className="feedback-controls">
          <input
            type="text"
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option>All Ratings</option>
            <option value="5">5 ★</option>
            <option value="4">4 ★</option>
            <option value="3">3 ★</option>
            <option value="2">2 ★</option>
            <option value="1">1 ★</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        <table className="feedback-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Order ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((fb) => (
                <tr key={fb.id}>
                  <td>{fb.id}</td>
                  <td>{fb.customer}</td>
                  <td>{fb.orderId}</td>
                  <td>{fb.rating} <FaStar color="gold" /></td>
                  <td>{fb.comment}</td>
                  <td>{fb.date}</td>
                  <td>
                    <span className={`status ${fb.status.toLowerCase()}`}>{fb.status}</span>
                    {replyConfirmedId === fb.id && (
                      <div className="reply-confirm-popup">Reply sent!</div>
                    )}
                  </td>
                  <td className="action-cell" style={{ position: 'relative' }} ref={openDropdownId === fb.id ? dropdownRef : null}>
                    <button className="dots-btn" onClick={() => handleDotsClick(fb.id)}>⋯</button>
                    {openDropdownId === fb.id && (
                      <div className="dropdown">
                        <button onClick={() => handleView(fb)}>View</button>
                        {fb.status !== 'Responded' && (
                          <button onClick={() => handleReplyClick(fb)}>Reply</button>
                        )}
                        <button onClick={() => handleDelete(fb.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                  No matching feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewFeedback && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Feedback from {viewFeedback.customer}</h2>
            <p>{viewFeedback.comment}</p>
            <button onClick={closeModal} className="close-btn">Close</button>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyModalData && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reply to {replyModalData.customer}</h2>
            <textarea
              rows="5"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleSendReply} className="send-btn">Send Reply</button>
              <button onClick={closeReplyModal} className="close-btn" style={{ marginLeft: '1rem' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
