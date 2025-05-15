"use client"

import { useState, useEffect } from "react"
import { FaStar, FaThumbsUp } from "react-icons/fa"
import "./Feedback.css"

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("reviews")
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const feedback = [
    {
      id: 1,
      customer: "John Doe",
      date: "May 10, 2023",
      type: "Review",
      content: "The food was amazing! Delivery was quick and everything was still hot when it arrived.",
      rating: 5,
      orderId: "ORD-001",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "May 9, 2023",
      type: "Review",
      content: "Good food but the delivery took longer than expected.",
      rating: 3,
      orderId: "ORD-002",
    },
    {
      id: 3,
      customer: "Robert Johnson",
      date: "May 8, 2023",
      type: "Message",
      content: "I have a question about allergens in your food. Do you have a list available?",
      orderId: null,
    },
    {
      id: 4,
      customer: "Emily Davis",
      date: "May 7, 2023",
      type: "Review",
      content: "Best burgers in town! Will definitely order again.",
      rating: 5,
      orderId: "ORD-004",
    },
    {
      id: 5,
      customer: "Michael Wilson",
      date: "May 6, 2023",
      type: "Message",
      content: "I'd like to suggest adding more vegetarian options to your menu.",
      orderId: null,
    },
  ]

  const filteredFeedback = feedback.filter((item) =>
    activeTab === "reviews" ? item.type === "Review" : item.type === "Message",
  )

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  const handleLike = () => {
    setLiked((prev) => !prev)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Customer Feedback</h1>
        <div className="tabs">
          <div
            className={`tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </div>
          <div
            className={`tab ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </div>
        </div>
      </div>

      <div className="feedback-list">
        {filteredFeedback.map((item) => (
          <div key={item.id} className="feedback-card">
            <div className="feedback-header">
              <div>
                <div className="feedback-customer">
                  <h3>{item.customer}</h3>
                  <span className="badge badge-outline">{item.type}</span>
                  {item.orderId && <span className="badge badge-outline">{item.orderId}</span>}
                </div>
                <p className="feedback-date">{item.date}</p>
              </div>

              <div className="feedback-actions">
                {item.type === "Review" && (
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < item.rating ? "star-filled" : "star-empty"} />
                    ))}
                  </div>
                )}

                <div className="dropdown">
                  <button className="btn btn-icon">
                    <span className="actions-dots"></span>
                  </button>
                  <div className="dropdown-content">
                    {item.type === "Message" ? (
                      <>
                        <div className="dropdown-item">Reply</div>
                        <div className="dropdown-item">Mark as resolved</div>
                      </>
                    ) : (
                      <>
                        <div className="dropdown-item">View order</div>
                        <div className="dropdown-item">Reply to review</div>
                      </>
                    )}
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item danger">Delete</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="feedback-content">{item.content}</p>

            <div className="feedback-footer">
              <button className="btn btn-ghost" onClick={handleLike}>
                <FaThumbsUp color={liked ? "blue" : "gray"} />
                <span>Helpful</span>
              </button>

              {item.type === "Message" && (
                <button className="btn btn-ghost">
                  <span>Reply</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedback
