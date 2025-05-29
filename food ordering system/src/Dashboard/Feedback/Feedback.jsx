import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './Feedback.css';

const initialFeedbackData = [
  { id: 'FB-001', customer: 'John Doe', orderId: 'ORD-001', rating: 5, comment: 'Excellent food and fast delivery! Will order again.', date: '2023-05-07', status: 'Pending' },
  { id: 'FB-002', customer: 'Jane Smith', orderId: 'ORD-002', rating: 4, comment: 'Food was good but delivery took long.', date: '2023-05-07', status: 'Responded' },
  { id: 'FB-003', customer: 'Robert Johnson', orderId: 'ORD-003', rating: 3, comment: 'Average experience. Food was okay.', date: '2023-05-06', status: 'Pending' },
  { id: 'FB-004', customer: 'Emily Davis', orderId: 'ORD-004', rating: 5, comment: 'Loved the burger! It was perfectly cooked.', date: '2023-05-06', status: 'Responded' },
  { id: 'FB-005', customer: 'Michael Wilson', orderId: 'ORD-005', rating: 2, comment: 'Food was cold when it arrived. Disappointed.', date: '2023-05-05', status: 'Responded' },
  { id: 'FB-006', customer: 'Sarah Brown', orderId: 'ORD-006', rating: 5, comment: "Best pizza I've had in a long time!", date: '2023-05-05', status: 'Pending' },
  { id: 'FB-007', customer: 'David Miller', orderId: 'ORD-007', rating: 4, comment: 'Good food and friendly delivery person.', date: '2023-05-04', status: 'Pending' },
  { id: 'FB-008', customer: 'Jennifer Taylor', orderId: 'ORD-008', rating: 1, comment: 'Wrong order delivered. Very disappointing.', date: '2023-05-04', status: 'Responded' },
];

const Feedback = () => {
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [feedback, setFeedback] = useState(initialFeedbackData);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [replyConfirmedId, setReplyConfirmedId] = useState(null);
  const [viewFeedback, setViewFeedback] = useState(null);
  const [replyModalData, setReplyModalData] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleView = (fb) => setViewFeedback(fb);

  const handleReplyClick = (fb) => {
    setReplyModalData(fb);
    setReplyText('');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setFeedback((prev) =>
      prev.map((fb) =>
        fb.id === replyModalData.id ? { ...fb, status: 'Responded' } : fb
      )
    );
    setReplyConfirmedId(replyModalData.id);
    setReplyModalData(null);
    setTimeout(() => setReplyConfirmedId(null), 2500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback((prev) => prev.filter((fb) => fb.id !== id));
      setOpenDropdownId(null);
    }
  };

  const handleDotsClick = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const closeModal = () => setViewFeedback(null);
  const closeReplyModal = () => setReplyModalData(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.action-cell') && !e.target.closest('.modal')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFeedback = feedback
    .filter((fb) => {
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
                  <td className="action-cell">
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
