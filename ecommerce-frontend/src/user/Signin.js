import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Layout from "../core/Layout";
import { API } from "../config";
import axios from "axios";
import Success from "./Success";
import Failed from "./Failed";
import Home from "../core/Home";
import { authenticate } from "../auth";

const Signin = ({ history }) => {
  const [switchState, setSwitchState] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { name, email, password } = values;

  // Higher Order Function (Function into another function)
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signIn = async () => {
    // console.log(`name,email,password`, name, email, password);
    if (email !== "" && password !== "") {
      try {
        let response = await axios.post(`${API}/signin`, {
          email: email,
          password: password,
        });
        console.log(`response.data :>> `, response.data);
        response.data.message == true
          ? setTimeout(() => {
              authenticate(
                response.data,
                history.push("/") && setSwitchState(false)
              );
              Success("Successfully Signin");
            }, 500)
          : Failed("Oops! Something Went Wrong");
      } catch (err) {
        console.log(`err`, err);
      }
    } else if (email === "" && password === "") {
      Failed("All fields must be filled!");
    } else if (email === email || password !== "") {
      Failed("Email and password do not match");
    } else if (email !== "" || password === password) {
      Failed("Email and password do not match");
    } else if (email !== email || password !== password) {
      Failed("Email and password do not match");
    } else {
      Failed("Email and password do not match");
    }
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return switchState === true ? (
    <Layout
      title="Signin"
      description="Signin Node React E-Commerce App"
      className="container col-md-8 offset-md-2"
    >
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
    </Layout>
  ) : (
    <Home setSwitchState={setSwitchState} />
  );
};

export default withRouter(Signin);
