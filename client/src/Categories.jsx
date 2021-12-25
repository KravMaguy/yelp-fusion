import axios from "axios";

const Categories = () => {
  const handleChange = async (e) => {
    const text = e.target.value;
    if (!text.trim()) return;
    const { data } = await axios.get(`/autocomplete/${text}`);
    console.log("the data ", data);
  };

  return (
    <>
      <h1>first select</h1>
      <input
        onChange={(e) => handleChange(e)}
        placeholder='search categories'
      />
      <h2>second select</h2>
    </>
  );
};

export default Categories;
