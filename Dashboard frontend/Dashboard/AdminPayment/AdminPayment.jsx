import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payments.css';

const Payments = () => {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All Methods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentsData, setPaymentsData] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/payments');
        setPaymentsData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = paymentsData.filter(payment => {
    const customer = payment?.customer_name || '';
    const orderId = payment?.order_id?.toString() || '';
    const paymentId = payment?.id?.toString() || '';

    const matchesSearch =
      customer.toLowerCase().includes(search.toLowerCase()) ||
      orderId.toLowerCase().includes(search.toLowerCase()) ||
      paymentId.toLowerCase().includes(search.toLowerCase());

    const matchesMethod =
      methodFilter === 'All Methods' || payment?.payment_method === methodFilter;
    const matchesStatus =
      statusFilter === 'All Status' || payment?.payment_status === statusFilter;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const toggleDropdown = (uniqueKey) => {
    setOpenDropdownId(prev => (prev === uniqueKey ? null : uniqueKey));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.action-cell')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewDetails = (payment) => {
    setViewModal(payment);
    setOpenDropdownId(null);
  };

  const handleRetry = (id) => {
    setPaymentsData(prev =>
      prev.map(payment =>
        payment?.id === id ? { ...payment, payment_status: 'Pending' } : payment
      )
    );
    setFeedbackMessage(`Retry initiated for payment ${id}`);
    setOpenDropdownId(null);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this payment?')) {
      setPaymentsData(prev => prev.filter(payment => payment?.id !== id));
      setFeedbackMessage(`Payment ${id} has been cancelled.`);
      setOpenDropdownId(null);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  return (
    <div className="payments-page">
      <h1>Payments</h1>
      <p>Track payment status and transaction history</p>

      <div className="payments-filters">
        <input
          type="text"
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
          <option>All Methods</option>
          <option>Credit Card</option>
          <option>COD</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Order Placed</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Out for Delivery</option>
        </select>
      </div>

      {feedbackMessage && (
        <div className="feedback-message" style={{ color: 'green', margin: '1rem 0' }}>
          {feedbackMessage}
        </div>
      )}

      <table className="payments-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map(payment => {
              const uniqueKey = `${payment?.id || payment?.order_id}-row`; // unique id
              return (
                <tr key={uniqueKey}>
                  <td>{payment?.order_id || 'N/A'}</td>
                  <td>{payment?.customer_name || 'N/A'}</td>
                  <td>{payment?.payment_method || 'N/A'}</td>
                  <td>{payment?.amount ?? '0.00'}</td>
                  <td>{payment?.payment_date || 'N/A'}</td>
                  <td>
                    <span className={`status ${(payment?.payment_status || '').toLowerCase()}`}>
                      {payment?.payment_status || 'N/A'}
                    </span>
                  </td>
                  <td className="action-cell" style={{ position: 'relative' }}>
                    <button className="dots-btn" onClick={() => toggleDropdown(uniqueKey)}>⋯</button>
                    {openDropdownId === uniqueKey && (
                      <div className="dropdown" style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        background: 'black',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '4px',
                        zIndex: 1000,
                        width: 150,
                      }}>
                        <button onClick={() => handleViewDetails(payment)}>View Details</button>
                        {payment?.payment_status === 'Failed' && (
                          <button onClick={() => handleRetry(payment?.id)}>Retry Payment</button>
                        )}
                        <button onClick={() => handleCancel(payment?.id)}>Cancel Payment</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {viewModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Payment Details</h2>
            <p><strong>Order ID:</strong> {viewModal?.order_id || 'N/A'}</p>
            <p><strong>Customer:</strong> {viewModal?.customer_name || 'N/A'}</p>
            <p><strong>Method:</strong> {viewModal?.payment_method || 'N/A'}</p>
            <p><strong>Amount:</strong> {viewModal?.amount ?? '0.00'}</p>
            <p><strong>Date:</strong> {viewModal?.payment_date || 'N/A'}</p>
            <p><strong>Status:</strong> {viewModal?.payment_status || 'N/A'}</p>
            <button onClick={() => setViewModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
