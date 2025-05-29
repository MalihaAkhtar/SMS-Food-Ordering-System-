import React from 'react';
import './CustomerReview.css';

const ratingsData = {
  average: 4.4,
  totalReviews: '1.43M',
  distribution: [70, 15, 7, 3, 5], // 5★ to 1★ in %
};

const reviews = [
  {
    name: 'Ashar Hasnain',
    date: 'August 14, 2024',
    rating: 1,
    comment: "The food was absolutely delicious! The chicken burger was juicy, and the fries were perfectly crispy. Delivered hot and on time. Will definitely order again"
  },
];

const CustomerReviews = () => {
  return (
    <div className="reviews-section">
      <h2>Ratings and Reviews</h2>
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
          {[5, 4, 3, 2, 1].map((star, idx) => (
            <div key={star} className="bar-line">
              <span>{star}</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${ratingsData.distribution[5 - star]}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="user-reviews">
        {reviews.map((rev, i) => (
          <div className="review-box" key={i}>
            <h4>{rev.name}</h4>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < rev.rating ? '⭐' : '☆'}</span>
              ))}
            </div>
            <small>{rev.date}</small>
            <p>{rev.comment}</p>
            
          </div>
        ))}
      </div>

      <button className="btn yellow-btn fulll-width review-btn">Write a Review</button>
    </div>
  );
};

export default CustomerReviews;
