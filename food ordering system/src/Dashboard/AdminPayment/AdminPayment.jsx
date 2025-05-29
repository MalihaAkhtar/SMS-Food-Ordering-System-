import React, { useState, useEffect } from 'react';
import './Payments.css';

const paymentsDataInitial = [
  { id: 'PAY-001', orderId: 'ORD-001', customer: 'John Doe', method: 'Card', amount: '$24.99', date: '2023-05-07', status: 'Completed' },
  { id: 'PAY-002', orderId: 'ORD-002', customer: 'Jane Smith', method: 'COD', amount: '$32.50', date: '2023-05-07', status: 'Pending' },
  { id: 'PAY-003', orderId: 'ORD-003', customer: 'Robert Johnson', method: 'Card', amount: '$18.75', date: '2023-05-07', status: 'Completed' },
  { id: 'PAY-004', orderId: 'ORD-004', customer: 'Emily Davis', method: 'Card', amount: '$42.00', date: '2023-05-06', status: 'Completed' },
  { id: 'PAY-005', orderId: 'ORD-005', customer: 'Michael Wilson', method: 'COD', amount: '$15.25', date: '2023-05-06', status: 'Pending' },
  { id: 'PAY-006', orderId: 'ORD-006', customer: 'Sarah Brown', method: 'Card', amount: '$29.99', date: '2023-05-06', status: 'Failed' },
  { id: 'PAY-007', orderId: 'ORD-007', customer: 'David Miller', method: 'Card', amount: '$53.75', date: '2023-05-05', status: 'Completed' },
  { id: 'PAY-008', orderId: 'ORD-008', customer: 'Jennifer Taylor', method: 'COD', amount: '$21.50', date: '2023-05-05', status: 'Pending' },
];

const Payments = () => {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All Methods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentsData, setPaymentsData] = useState(paymentsDataInitial);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [viewModal, setViewModal] = useState(null); // store selected payment

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(search.toLowerCase());

    const matchesMethod = methodFilter === 'All Methods' || payment.method === methodFilter;
    const matchesStatus = statusFilter === 'All Status' || payment.status === statusFilter;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const toggleDropdown = (id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
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
        payment.id === id ? { ...payment, status: 'Pending' } : payment
      )
    );
    setFeedbackMessage('Retry initiated for payment ' + id);
    setOpenDropdownId(null);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this payment?')) {
      setPaymentsData(prev => prev.filter(payment => payment.id !== id));
      setFeedbackMessage('Payment ' + id + ' has been cancelled.');
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
          <option>Card</option>
          <option>COD</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
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
            <th>Payment ID</th>
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
            filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.orderId}</td>
                <td>{payment.customer}</td>
                <td>{payment.method}</td>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>
                <td>
                  <span className={`status ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="action-cell" style={{ position: 'relative' }}>
                  <button className="dots-btn" onClick={() => toggleDropdown(payment.id)}>⋯</button>
                  {openDropdownId === payment.id && (
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
                      {payment.status === 'Failed' && (
                        <button onClick={() => handleRetry(payment.id)}>Retry Payment</button>
                      )}
                      <button onClick={() => handleCancel(payment.id)}>Cancel Payment</button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal View */}
      {viewModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Payment Details</h2>
            <p><strong>Payment ID:</strong> {viewModal.id}</p>
            <p><strong>Order ID:</strong> {viewModal.orderId}</p>
            <p><strong>Customer:</strong> {viewModal.customer}</p>
            <p><strong>Method:</strong> {viewModal.method}</p>
            <p><strong>Amount:</strong> {viewModal.amount}</p>
            <p><strong>Date:</strong> {viewModal.date}</p>
            <p><strong>Status:</strong> {viewModal.status}</p>
            <button onClick={() => setViewModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
