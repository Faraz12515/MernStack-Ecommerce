import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            Name: <b>{name}</b>
          </li>
          <li className="list-group-item">
            Email: <b>{email}</b>
          </li>
          <li className="list-group-item">
            Role: <b> {role === 1 ? "Admin" : "Registered User"}</b>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Admin Dashboard"
      description={`G'day, ${name}!`}
      className="container col-md-8 offset-md-2"
    >
      <div className="row">
        <div className="col-md-3">{adminLinks()}</div>
        <div className="col-md-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
