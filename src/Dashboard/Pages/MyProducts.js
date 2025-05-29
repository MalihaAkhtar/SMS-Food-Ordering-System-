import Table from "../Components/Table";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./MyProducts.css";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Spicy Chicken Burger",
      image: "/placeholder.svg?height=50&width=50",
      price: 9.99,
      category: "Burgers",
      available: true,
    },
    {
      id: 2,
      name: "Veggie Supreme Pizza",
      image: "/placeholder.svg?height=50&width=50",
      price: 12.99,
      category: "Pizza",
      available: true,
    },
    {
      id: 3,
      name: "Classic Beef Burger",
      image: "/placeholder.svg?height=50&width=50",
      price: 8.99,
      category: "Burgers",
      available: true,
    },
    {
      id: 4,
      name: "Chocolate Milkshake",
      image: "/placeholder.svg?height=50&width=50",
      price: 4.99,
      category: "Beverages",
      available: true,
    },
    {
      id: 5,
      name: "Garlic Bread",
      image: "/placeholder.svg?height=50&width=50",
      price: 3.99,
      category: "Sides",
      available: false,
    },
    {
      id: 6,
      name: "Caesar Salad",
      image: "/placeholder.svg?height=50&width=50",
      price: 7.99,
      category: "Salads",
      available: true,
    },
    {
      id: 7,
      name: "Chicken Wings",
      image: "/placeholder.svg?height=50&width=50",
      price: 8.99,
      category: "Appetizers",
      available: true,
    },
  ];

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (row) => (
        <div className="product-image">
          <img src={row.image || "/placeholder.svg"} alt={row.name} />
        </div>
      ),
    },
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    {
      header: "Price",
      accessor: "price",
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: "available",
      render: (row) => (
        <span className={`badge ${row.available ? "badge-green" : "badge-red"}`}>
          {row.available ? "Available" : "Unavailable"}
        </span>
      ),
    },
  ];

  const actions = [
    { label: "Actions" },
    {
      name: "Edit",
      icon: <FaEdit />,
      onClick: (product) => console.log("Edit", product),
    },
    {
      name: "Delete",
      icon: <FaTrash />,
      danger: true,
      onClick: (product) => console.log("Delete", product),
    },
    { divider: true },
    {
      name: (row) =>
        row.available ? "Mark as unavailable" : "Mark as available",
      onClick: (product) => console.log("Toggle availability", product),
    },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Manage Products</h1>
        <button className="btn btn-primary">
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      <Table columns={columns} data={products} actions={actions} />
    </div>
  );
};

export default Products;
