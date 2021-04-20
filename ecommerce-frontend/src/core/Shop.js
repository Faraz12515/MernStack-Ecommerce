import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import CheckBox from "./CheckBox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  // load categories //
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
        console.log(`data:>>`, data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy) => {
    console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
