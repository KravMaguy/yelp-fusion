import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
const loadOptions = async (inputValue, callback) => {
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
        isMulti
        onInputChange={handleInputChange}
        loadOptions={loadOptions}
        components={animatedComponents}
        // styles={customStyles}
      />
    </div>
  );
}
