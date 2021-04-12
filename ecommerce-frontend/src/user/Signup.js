import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Layout from "../core/Layout";
import { API } from "../config";
import axios from "axios";
import Success from "./Success";
import Failed from "./Failed";
import Signin from "./Signin";

const Signup = ({ history }) => {
  const [switchState, setSwitchState] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  // Higher Order Function (Function into another function)
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signUp = async () => {
    // console.log(`name,email,password`, name, email, password);
    if (name !== "" && email !== "" && password !== "") {
      try {
        let response = await axios.post(`${API}/signup`, {
          name: name,
          email: email,
          password: password,
        });
        console.log(`response.data :>> `, response.data);
        response.data.message == true
          ? setTimeout(() => {
              Success("New account is created successfully. Please Signin");
              history.push("/signin") && setSwitchState(false);
            }, 500)
          : Failed("Oops! Something Went Wrong");
      } catch (err) {
        console.log(`err`, err);
      }
    } else {
      Failed("All fields must be filled!");
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return switchState === true ? (
    <Layout
      title="Signup"
      description="Signup Node React E-Commerce App"
      className="container col-md-8 offset-md-2"
    >
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            className="form-control"
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
        </div>
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
    </Layout>
  ) : (
    <Signin setSwitchState={setSwitchState} />
  );
};

export default withRouter(Signup);
