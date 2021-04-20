import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Success from "../user/Success";
import Failed from "../user/Failed";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#333333" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  //Handling Signout with setTimeout
  // const handleSignOut = () => {
  //   setTimeout(() => {
  //     Success("Successfully Signout") && signout(history.push("/"));
  //   }, 500);
  // };

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav--item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav--item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav--item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav--item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>
            <li className="nav--item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav--item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => (
                signout(history.push("/")), Failed("Successfully Signout")
              )}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
