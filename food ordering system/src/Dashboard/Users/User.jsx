/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./users.css";
import UserRow from "./UserRow";
import EditUserModal from "./EditUserModal";

const dummyUsers = [
  { id: "USR-001", name: "John Doe", email: "john.doe@example.com", joined: "2023-01-15", orders: 12, status: "Active" },
  { id: "USR-002", name: "Jane Smith", email: "jane.smith@example.com", joined: "2023-02-20", orders: 8, status: "Active" },
  { id: "USR-003", name: "Robert Johnson", email: "robert.johnson@example.com", joined: "2023-03-05", orders: 5, status: "Blocked" },
  { id: "USR-004", name: "Emily Davis", email: "emily.davis@example.com", joined: "2023-03-12", orders: 15, status: "Active" },
  { id: "USR-005", name: "Michael Wilson", email: "michael.wilson@example.com", joined: "2023-04-01", orders: 3, status: "Active" },
  { id: "USR-006", name: "Sarah Brown", email: "sarah.brown@example.com", joined: "2023-04-15", orders: 7, status: "Active" },
  { id: "USR-007", name: "David Miller", email: "david.miller@example.com", joined: "2023-04-22", orders: 0, status: "Blocked" },
  { id: "USR-008", name: "Jennifer Taylor", email: "jennifer.taylor@example.com", joined: "2023-05-01", orders: 2, status: "Active" },
];

const UsersPage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Users");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditingUser(null);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
  };

  const handleBlockToggle = (user) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === "Blocked" ? "Active" : "Blocked" }
          : u
      )
    );
  };

  const handleDelete = (user) => {
    if (
      window.confirm(`Are you sure you want to delete ${user.name}?`)
    ) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  const filteredUsers = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) =>
      statusFilter === "All Users" ? true : u.status === statusFilter
    )
    .sort((a, b) => {
      if (sortOrder === "Newest")
        return new Date(b.joined) - new Date(a.joined);
      if (sortOrder === "Oldest")
        return new Date(a.joined) - new Date(b.joined);
      return 0;
    });

  return (
    <div className="User-page">
      <div className="User-header">
        <div>
          <h2>Users</h2>
          <p>Manage customer accounts and order history</p>
        </div>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search users..."
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Users</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
        <select
          className="filter-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

      <div className="table">
        <div className="table-row table-header">
          <div>User ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Joined</div>
          <div>Orders</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onBlockToggle={handleBlockToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UsersPage;
