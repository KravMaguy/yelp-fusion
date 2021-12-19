import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import Register from "./Register.jsx";

const Search = ({ setInitialReq }) => {
  const [register, setRegister] = useState(false);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(term, "term");
      const terms = { term, place };
      console.log(terms, "terms");
      const { data } = await axios.post("/api/", terms);
      setLoading(false);
      setData(data.businesses);
      console.log("buisnesses: ", data.businesses);
      setInitialReq(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <button onClick={() => setRegister(!register)}>
        {register ? "X" : "Claim Buisness"}
      </button>
      {register && <Register />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setPlace(e.target.value)}
          placeholder='Enter place to search'
          type='text'
          name='place'
          value={place}
        />
        <input
          onChange={(e) => setTerm(e.target.value)}
          placeholder={`Search in ${place}`}
          type='text'
          name='name'
          value={term}
        />
        <input
          type='submit'
          value='Submit'
          disabled={loading || term.length < 1}
        />
      </form>

      {error === "" ? (
        loading ? (
          <img src={logo} className='App-logo' alt='logo' />
        ) : data.length > 0 ? (
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            {data.map((buisness) => {
              return (
                <li>
                  <Link
                    key={buisness.id}
                    state={{ businessesName: buisness.name }}
                    to={`buisness/${buisness.id}`}
                  >
                    {buisness.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>please enter a keyword to search</p>
        )
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
};

export default Search;
