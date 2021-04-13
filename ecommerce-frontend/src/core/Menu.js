import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Success from "../user/Success";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  //Handling Signout with setTimeout
  const handleSignOut = () => {
    setTimeout(() => {
      signout(history.push("/")) && Success("Successfully Signout");
    }, 500);
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav--item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav--item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav--item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav--item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "white" }}
              onClick={handleSignOut}
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
