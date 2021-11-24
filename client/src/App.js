import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Buisness from "./Buisness";

function App() {
  const location = useLocation();
  const { pathname } = location;

  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
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
    } catch (error) {
      console.log("err message", error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='App'>
      {pathname === "/" && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setTerm(e.target.value)}
            placeholder='Search in Naperville'
            type='text'
            name='name'
          />
          <input type='submit' value='Submit' disabled={loading} />
        </form>
      )}

      {pathname !== "/" && (
        <Buisness name={pathname.slice(1).replace(/%20/g, " ")} data={data} />
      )}

      {error === "" ? (
        pathname === "/" &&
        (loading ? (
          <img src={logo} className='App-logo' alt='logo' />
        ) : data.length > 0 ? (
          data.map((buisness) => {
            return (
              <Link
                key={buisness.id}
                to={buisness.name.trim().replace(/\s/g, "%20")}
              >
                {buisness.name}
              </Link>
            );
          })
        ) : (
          <p>no buisnesses match this search term please try again</p>
        ))
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default App;
