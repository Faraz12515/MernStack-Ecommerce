import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-4 my-3 d-flex justify-content-center">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body text-center">
          <ShowImage item={product} url="product" />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2  mb-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-dark mt-2 ml-3 mb-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
