import React, { useState, useEffect } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (v) => () => {
    // return the first index or -1 //
    const currentCategoryId = checked.indexOf(v);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(v);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(`newCheckedCategoryId`, newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((v, i) => {
    return (
      <li key={i} className="list-unstyled">
        <input
          onChange={handleToggle(v._id)}
          value={checked.indexOf(v._id === -1)}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label">{v.name}</label>
      </li>
    );
  });
};

export default CheckBox;
