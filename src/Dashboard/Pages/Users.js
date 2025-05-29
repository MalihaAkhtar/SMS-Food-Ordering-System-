import Table from "../Components/Table"
import { FaSearch, FaShoppingBag, FaBan } from "react-icons/fa"
import "./Users.css"

const Users = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      joined: "Jan 10, 2023",
      orders: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      joined: "Feb 15, 2023",
      orders: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      joined: "Mar 22, 2023",
      orders: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      joined: "Apr 5, 2023",
      orders: 15,
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      joined: "May 18, 2023",
      orders: 3,
      status: "Blocked",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      joined: "Jun 30, 2023",
      orders: 7,
      status: "Active",
    },
  ]

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Joined", accessor: "joined" },
    {
      header: "Orders",
      accessor: "orders",
      render: (row) => (
        <div className="orders-count">
          <FaShoppingBag className="orders-icon" />
          <span>{row.orders}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span className={`badge ${row.status === "Active" ? "badge-green" : "badge-red"}`}>{row.status}</span>
      ),
    },
  ]

  const actions = [
    { label: "Actions" },
    {
      name: "View profile",
      onClick: (user) => console.log("View profile", user),
    },
    {
      name: "Order history",
      onClick: (user) => console.log("Order history", user),
    },
    { divider: true },
    {
      name: (row) => (row.status === "Active" ? "Block user" : "Unblock user"),
      icon: <FaBan />,
      danger: true,
      onClick: (user) => console.log("Toggle block", user),
    },
  ]

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Manage Users</h1>
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">Search users</label>
          <FaSearch className="search-icon" />
          <input 
            type="search" 
            id="search-input" 
            placeholder="Search users..." 
            className="search-input" 
          />
        </div>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table columns={columns} data={users} actions={actions} />
      )}
    </div>
  )
}

export default Users
