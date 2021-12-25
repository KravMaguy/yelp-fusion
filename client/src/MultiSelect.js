import { useState } from "react";
import Select from "./Select";

let filterOptions = [
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "seo", label: "SEO" },
  { value: "php", label: "PHP" },
  { value: "node js", label: "Node Js" },
];

const MultiSelect = () => {
  const [selectError, setSelectError] = useState(false);
  const [multiValue, setMultiValue] = useState([]);
  const handleMultiChange = (option) => {
    setMultiValue(option);
    checkMulti();
  };

  const checkMulti = () => {
    if (multiValue.length < 1) {
      setSelectError();
    } else {
      setSelectError(false);
    }
  };
  return (
    <>
      <Select
        setSelectError={setSelectError}
        handleMultiChange={handleMultiChange}
        filterOptions={filterOptions}
        multiValue={multiValue}
      />
    </>
  );
};

export default MultiSelect;
