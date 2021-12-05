import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { Link } from "react-router-dom";

const Search = ({ setInitialReq }) => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const terms = { term };
      const { data } = await axios.post("/api/", terms);
      setLoading(false);
      setData(data.businesses);
      setInitialReq(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setTerm(e.target.value)}
          placeholder='Search in Naperville'
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
          data.map((buisness) => {
            return (
              <Link
                key={buisness.id}
                state={{ businessesName: buisness.name }}
                to={`buisness/${buisness.id}`}
              >
                {buisness.name}
              </Link>
            );
          })
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
