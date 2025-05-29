import React, { useState, useRef, useEffect } from "react";

const UserRow = ({ user, onEdit, onBlockToggle, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="table-row">
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.joined}</div>
      <div>{user.orders}</div>
      <div>
        <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
      </div>
      <div className="action-cell" ref={menuRef}>
        <button className="dots-btn" onClick={() => setOpen(!open)}>⋯</button>
        {open && (
          <div className="dropdown">
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onBlockToggle(user)}>
              {user.status === "Blocked" ? "Unblock" : "Block"}
            </button>
            <button onClick={() => onDelete(user)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRow;
