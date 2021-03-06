import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  // Load Products By Sell //
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data.products);
        console.log(`data`, data);
      }
    });
  };

  // Load Products By Arrial //
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data.products);
        console.log(`data`, data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-Commerce App"
      className="container-fluid"
    >
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.length &&
          productsBySell.map((product, i) => {
            return <Card key={i} product={product} />;
          })}
      </div>

      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival &&
          productsByArrival.map((product, i) => {
            return <Card key={i} product={product} />;
          })}
      </div>
    </Layout>
  );
};

export default Home;
