import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((v, i) => {
    return (
      <div key={i}>
        <input
          onChange={handleChange}
          name={v}
          value={`${v._id}`}
          type="radio"
          className="mr-2 ml-4"
        />
        <label className="form-check-label">{v.name}</label>
      </div>
    );
  });
};

export default RadioBox;
