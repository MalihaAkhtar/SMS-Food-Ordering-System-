import { useState } from "react";
import Table from "../Components/Table";
import { FaSearch, FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";
import "./MyOrder.css";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-05-12 10:30 AM",
      status: "Delivered",
      items: 3,
      total: "$24.99",
      payment: "Card",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-05-12 09:45 AM",
      status: "Preparing",
      items: 2,
      total: "$42.50",
      payment: "Card",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-05-12 09:15 AM",
      status: "Pending",
      items: 1,
      total: "$18.75",
      payment: "COD",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-05-11 08:30 PM",
      status: "Delivered",
      items: 4,
      total: "$32.20",
      payment: "Card",
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-05-11 07:45 PM",
      status: "Pending",
      items: 2,
      total: "$15.99",
      payment: "COD",
    },
    {
      id: "ORD-006",
      customer: "Sarah Brown",
      date: "2023-05-11 06:30 PM",
      status: "Delivered",
      items: 3,
      total: "$28.75",
      payment: "Card",
    },
    {
      id: "ORD-007",
      customer: "David Miller",
      date: "2023-05-11 05:15 PM",
      status: "Preparing",
      items: 1,
      total: "$9.99",
      payment: "Card",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearchTerm = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearchTerm && matchesStatus;
  });

  const columns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Date", accessor: "date" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`badge ${
            row.status === "Delivered"
              ? "badge-green"
              : row.status === "Preparing"
              ? "badge-blue"
              : "badge-yellow"
          }`}
        >
          {row.status === "Pending" && <FaClock className="badge-icon" />}
          {row.status === "Preparing" && <FaTruck className="badge-icon" />}
          {row.status === "Delivered" && <FaCheckCircle className="badge-icon" />}
          {row.status}
        </span>
      ),
    },
    { header: "Items", accessor: "items" },
    { header: "Total", accessor: "total" },
    {
      header: "Payment",
      accessor: "payment",
      render: (row) => <span className="badge badge-outline">{row.payment}</span>,
    },
  ];

  const actions = [
    { label: "Actions" },
    {
      name: "View details",
      onClick: (order) => console.log("View details", order),
    },
    {
      name: "Update status",
      onClick: (order) => console.log("Update status", order),
    },
    { divider: true },
    {
      name: "Cancel order",
      danger: true,
      onClick: (order) => console.log("Cancel order", order),
    },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Manage Orders</h1>
        <div className="flex flex-responsive gap-2">
          <div className="relative">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search orders..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <Table columns={columns} data={filteredOrders} actions={actions} />
    </div>
  );
};

export default Orders;
