import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          onChange={handleChange}
          type="text"
          value={name}
          autoFocus
          required
        />
      </div>

      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Create Category
      </button>
    </form>
  );

  //   const showSuccess = () => {
  //     if (success) {
  //       return <h3 className="text-success">{name} is created</h3>;
  //     }
  //   };

  const showError = () => {
    if (error) {
      return <h5 className="text-danger">Category is should be unique</h5>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new Category"
      description={`G'day, ${user.name}, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
