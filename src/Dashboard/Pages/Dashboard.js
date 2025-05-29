import React, { useState } from "react";
import DashboardHeader from '../Components/DashboardHeader';
import StatCard from "../Components/StatCard";
import Table from "../Components/Table";
import Sidebar from "../Components/Sidebar";
import { FaChartLine, FaShoppingBag, FaUsers, FaClock } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Dynamic sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", status: "Delivered", total: "$24.99", date: "10 min ago" },
    { id: "ORD-002", customer: "Jane Smith", status: "Preparing", total: "$42.50", date: "25 min ago" },
    { id: "ORD-003", customer: "Robert Johnson", status: "Pending", total: "$18.75", date: "45 min ago" },
    { id: "ORD-004", customer: "Emily Davis", status: "Delivered", total: "$32.20", date: "1 hour ago" },
    { id: "ORD-005", customer: "Michael Wilson", status: "Pending", total: "$15.99", date: "2 hours ago" }
  ];

  const popularItems = [
    { id: 1, name: "Spicy Chicken Burger", orders: 124, image: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Veggie Supreme Pizza", orders: 98, image: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Classic Beef Burger", orders: 85, image: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "Chocolate Milkshake", orders: 76, image: "/placeholder.svg?height=50&width=50" }
  ];

  const orderColumns = [
    { header: "Order", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`badge ${getStatusBadge(row.status)}`}
        >
          {row.status}
        </span>
      )
    },
    {
      header: "Amount",
      accessor: "total",
      render: (row) => (
        <span style={{ textAlign: "right", display: "block" }}>{row.total}</span>
      )
    }
  ];

  const getStatusBadge = (status) => {
    const badgeStyles = {
      Delivered: "badge-green",
      Preparing: "badge-blue",
      Pending: "badge-yellow"
    };
    return badgeStyles[status] || "badge-default";
  };

  return (
    <div className="dashboard-container flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main dashboard content */}
      <div className="dashboard-content flex-1 p-4">
        <DashboardHeader />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" icon={<FaChartLine />} />
          <StatCard title="Total Orders" value="+2350" change="+12.2% from last month" icon={<FaShoppingBag />} />
          <StatCard title="Total Users" value="+573" change="+8.4% from last month" icon={<FaUsers />} />
          <StatCard title="Pending Orders" value="18" change="-2 from yesterday" icon={<FaClock />} />
        </div>

        {/* Recent Orders and Popular Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* Recent Orders */}
          <div className="card p-4 bg-white rounded-xl shadow-md">
            <h2 className="card-title text-xl font-bold">Recent Orders</h2>
            <p className="card-subtitle text-gray-500 mb-4">
              You have {recentOrders.length} orders today
            </p>
            <Table columns={orderColumns} data={recentOrders} />
          </div>

          {/* Popular Items */}
          <div className="card p-4 bg-white rounded-xl shadow-md">
            <h2 className="card-title text-xl font-bold">Popular Items</h2>
            <p className="card-subtitle text-gray-500 mb-4">
              Most ordered items this month
            </p>
            <div className="popular-items space-y-4">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-2 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.orders} orders this month</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-600">#{item.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
