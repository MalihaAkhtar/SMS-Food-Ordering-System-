"use client";

import React, { useState, useEffect, useRef } from "react";
import "./Table.css";

const Table = ({ columns, data, actions }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`col-${index}`}>{column.header}</th>
            ))}
            {actions && <th className="actions-column">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((column, colIndex) => (
                <td key={`cell-${rowIndex}-${colIndex}`}>
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
              {actions && (
                <td className="actions-cell">
                  <div
                    className="dropdown"
                    ref={(el) => (dropdownRefs.current[rowIndex] = el)}
                  >
                    <button
                      className="btn btn-icon actions-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(rowIndex);
                      }}
                    >
                      <span className="actions-dots">⋮</span>
                    </button>

                    {activeDropdown === rowIndex && (
                      <div className="dropdown-content actions-dropdown show">
                        {actions.map((action, actionIndex) => (
                          <React.Fragment key={`action-${actionIndex}`}>
                            {action.divider ? (
                              <div className="dropdown-divider"></div>
                            ) : action.label ? (
                              <div className="dropdown-label">{action.label}</div>
                            ) : (
                              <div
                                className={`dropdown-item ${action.danger ? "danger" : ""}`}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  action.onClick?.(row);
                                }}
                              >
                                {action.icon && (
                                  <span className="action-icon">{action.icon}</span>
                                )}
                                {action.name}
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
