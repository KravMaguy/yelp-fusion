import { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const handleChange = async (e) => {
    const text = e.target.value;
    const { data } = await axios.get(`/autocomplete/${text}`);
    console.log("the data ", data);
  };

  return (
    <>
      <input
        onChange={(e) => handleChange(e)}
        placeholder='search categories'
      />
    </>
  );
};

export default Categories;
