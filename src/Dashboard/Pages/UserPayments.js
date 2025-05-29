import Table from "../Components/Table"
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"
import "./UserPayments.css"

const Payments = () => {
  const payments = [
    {
      id: "PAY-001",
      orderId: "ORD-001",
      customer: "John Doe",
      date: "May 12, 2023",
      amount: "$24.99",
      method: "Card",
      status: "Completed",
    },
    {
      id: "PAY-002",
      orderId: "ORD-002",
      customer: "Jane Smith",
      date: "May 12, 2023",
      amount: "$42.50",
      method: "Card",
      status: "Completed",
    },
    {
      id: "PAY-003",
      orderId: "ORD-003",
      customer: "Robert Johnson",
      date: "May 12, 2023",
      amount: "$18.75",
      method: "COD",
      status: "Pending",
    },
    {
      id: "PAY-004",
      orderId: "ORD-004",
      customer: "Emily Davis",
      date: "May 11, 2023",
      amount: "$32.20",
      method: "Card",
      status: "Completed",
    },
    {
      id: "PAY-005",
      orderId: "ORD-005",
      customer: "Michael Wilson",
      date: "May 11, 2023",
      amount: "$15.99",
      method: "COD",
      status: "Pending",
    },
    {
      id: "PAY-006",
      orderId: "ORD-006",
      customer: "Sarah Brown",
      date: "May 11, 2023",
      amount: "$28.75",
      method: "Card",
      status: "Failed",
    },
  ]

  const columns = [
    { header: "Payment ID", accessor: "id" },
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer", accessor: "customer" },
    { header: "Date", accessor: "date" },
    { header: "Amount", accessor: "amount" },
    {
      header: "Method",
      accessor: "method",
      render: (row) => <span className="badge badge-outline">{row.method}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`badge ${
            row.status === "Completed"
              ? "badge-green"
              : row.status === "Pending"
              ? "badge-yellow"
              : "badge-red"
          }`}
        >
          {row.status === "Completed" && <FaCheckCircle className="badge-icon" />}
          {row.status === "Pending" && <FaClock className="badge-icon" />}
          {row.status === "Failed" && <FaTimesCircle className="badge-icon" />}
          {row.status}
        </span>
      ),
    },
  ]

  const actions = [
    { label: "Actions" },
    {
      name: "View details",
      onClick: (payment) => console.log("View details", payment),
    },
    {
      name: "Send receipt",
      onClick: (payment) => console.log("Send receipt", payment),
    },
    {
      divider: true,
      condition: (row) => row.status === "Pending",
    },
    {
      name: "Mark as completed",
      condition: (row) => row.status === "Pending",
      onClick: (payment) => console.log("Mark as completed", payment),
    },
    {
      name: "Mark as failed",
      condition: (row) => row.status === "Pending",
      danger: true,
      onClick: (payment) => console.log("Mark as failed", payment),
    },
  ]

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Payment Information</h1>
        <div className="flex flex-responsive gap-2">
          <select className="select">
            <option value="all">All Methods</option>
            <option value="card">Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <select className="select">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <Table
        columns={columns}
        data={payments}
        actions={actions.filter(
          (action) =>
            !action.condition || payments.some((payment) => action.condition(payment))
        )}
      />
    </div>
  )
}

export default Payments
