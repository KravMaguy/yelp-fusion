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
    const opacity = state.isDisabled ? 0.5 : 0.5;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
  // valueContainer: (provided, state) => {
  //   return { ...provided, width: "fit-content!important" };
  // },
  multiValueContainer: (provided, state) => {
    return { ...provided, width: "fit-content!important" };
  },
  // multiValue: (provided, state) => {
  //   return { ...provided, width: "fit-content!important" };
  // },
};

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(
    `http://localhost:5000/autocomplete/${inputValue}`
  );
  const options = data.categories.map((category) => ({
    value: category.alias,
    label: category.title,
  }));
  const additionalOptions = data.terms.map((term) => ({
    value: term.text,
    label: term.text,
  }));
  return options
    .concat(additionalOptions)
    .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export default function MultiSelectAsync() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { option } = selectedOptions;

  const handleInputChange = (newValue) => {
    if (option && option.length > 5) {
      return;
    }
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(newValue);
    return inputValue;
  };

  const handleChange = (option) => {
    setSelectedOptions({ option });
  };

  return (
    <div>
      <pre>inputValue: "{inputValue}"</pre>
      <form className="w-70 center">
        <div className="shadow p-10 mt-10">
          <AsyncSelect
            cacheOptions
            defaultOptions
            onInputChange={handleInputChange}
            loadOptions={loadOptions}
            components={animatedComponents}
            isMulti
            styles={customStyles}
            onChange={handleChange}
            value={option}
          />
        </div>
        <div className="shadow p-10 mt-10">
          <input
            className="btn-wide"
            type="submit"
            value="Submit"
            // disabled={loading || term.length < 1}
          />
        </div>
      </form>
    </div>
  );
}
