import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted purple",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
const loadOptions = async (inputValue) => {
  const options = [];
  const { data } = await axios.get(`/autocomplete/${inputValue}`);
  const myData = data.categories.map((category) =>
    options.push({ value: category.alias, label: category.title })
  );
  const data2 = data.terms.map((term) =>
    options.push({
      value: term.text,
      label: term.text,
    })
  );
  return options.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

export default function MultiSelectAsync() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(newValue);
    return inputValue;
  };

  return (
    <div>
      <pre>inputValue: "{inputValue}"</pre>
      <AsyncSelect
        cacheOptions
        defaultOptions
        onInputChange={handleInputChange}
        loadOptions={loadOptions}
        components={animatedComponents}
        isMulti
        styles={customStyles}
      />
    </div>
  );
}
