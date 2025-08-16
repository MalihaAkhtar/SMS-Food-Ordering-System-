import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";
import UserRow from "./UserRow";
import EditUserModal from "./EditUserModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Users");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsersFromAPI();
  }, []);

  const fetchUsersFromAPI = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Optional: show message or fallback data
    }
  };

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
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  };

  const filteredUsers = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) =>
      statusFilter === "All Users" ? true : u.status === statusFilter
    )
    .sort((a, b) => {
      if (sortOrder === "Newest") return new Date(b.joined) - new Date(a.joined);
      if (sortOrder === "Oldest") return new Date(a.joined) - new Date(b.joined);
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
