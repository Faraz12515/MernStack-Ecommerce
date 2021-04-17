import React, { useState, useEffect } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // Higher Order Function (Function into another function)
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        console.log(`data.error`, data.error);
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading...
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin Node React E-Commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            className="form-control"
            onChange={handleChange("email")}
            type="text"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            className="form-control"
            onChange={handleChange("password")}
            type="text"
            value={password}
          />
        </div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </form>
      {redirectUser()}
    </Layout>
  );
};

export default withRouter(Signin);
