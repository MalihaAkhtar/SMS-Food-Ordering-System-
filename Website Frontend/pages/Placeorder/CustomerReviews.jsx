import React, { useState, useEffect } from 'react';
import './CustomerReview.css';

const ratingsData = {
  average: 4.4,
  totalReviews: '1.43M',
  distribution: [70, 15, 7, 3, 5],
};

const CustomerReviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userNameInput, setUserNameInput] = useState('');

  // Fetch reviews from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, []);

  const handleSubmit = async () => {
    // Check required fields
    if (!rating || !comment.trim() || (!user?.name && !userNameInput.trim())) {
      alert('Please add a rating, comment, and name');
      return;
    }

    // Decide which name to use
    const reviewerName = user?.name || user?.displayName || userNameInput.trim() || 'Customer';

    const newReview = {
      name: reviewerName,
      date: new Date().toLocaleDateString(),
      rating,
      comment,
    };

    try {
      // Send to backend
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Update reviews locally
      setReviews([newReview, ...reviews]);
      setShowModal(false);
      setRating(0);
      setComment('');
      setUserNameInput('');
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
  };

  return (
    <div className="reviews-section">
      <h2>Ratings and Reviews</h2>

      {/* Ratings Overview */}
      <div className="ratings-overview">
        <div className="left-panel">
          <div className="avg-rating">{ratingsData.average}</div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(ratingsData.average) ? '⭐' : '☆'}</span>
            ))}
          </div>
          <div className="total-reviews">{ratingsData.totalReviews} reviews</div>
        </div>

        <div className="right-panel">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="bar-line">
              <span>{star}</span>
              <div className="bar-bg">
                <div
                  className="bar-fill"
                  style={{ width: `${ratingsData.distribution[5 - star]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {/* Reviews List */}
<div className="user-reviews">
  {reviews.map((rev) => (
    <div className="review-box" key={rev.id || rev.name + rev.date}>
      <h4>{rev.name}</h4>
      <div className="stars">
        {[...Array(5)].map((_, idx) => (
          <span key={idx}>{idx < rev.rating ? '⭐' : '☆'}</span>
        ))}
      </div>
      <small>{rev.date}</small>
      <p>{rev.comment}</p>

      {/* Show reply/response if exists */}
      {rev.reply && (
        <div className="review-reply" style={{ marginTop: '8px', paddingLeft: '12px', borderLeft: '3px solid #ccc' }}>
          <strong>Response:</strong>
          <p>{rev.reply}</p>
        </div>
      )}
    </div>
  ))}
</div>


      {/* Write Review Button */}
      <button className="btn yellow-btn review-btn" onClick={() => setShowModal(true)}>
        Write a Review
      </button>

      {/* Modal */}
      {showModal && (
        <div className="review-modal">
          <div className="modal-content">
            <h3>Write a Review</h3>

            {/* Name input only if user name not available */}
            {!user?.name && !user?.displayName && (
              <input
                type="text"
                placeholder="Your name"
                value={userNameInput}
                onChange={(e) => setUserNameInput(e.target.value)}
                style={{ marginBottom: '12px', padding: '8px', fontSize: '16px', width: '100%' }}
              />
            )}

            <div className="star-selector" style={{ marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: i < rating ? 'gold' : '#ccc',
                    marginRight: '4px',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', height: '80px', padding: '8px', fontSize: '16px' }}
            ></textarea>

            <div className="modal-actions" style={{ marginTop: '12px' }}>
              <button onClick={handleSubmit} style={{ marginRight: '8px' }}>
                Submit
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
