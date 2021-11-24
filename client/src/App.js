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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit with your input: ", term);
    try {
      const terms = { term };
      const { data } = await axios.post("/api/", terms);
      console.log("recieved from backend: ", data);
      setData(data.businesses);
    } catch (error) {
      // setIsError(true)
      // setError(error.response.data.message)
      console.log(error, "the error");
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {pathname === "/" && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={(e) => setTerm(e.target.value)}
              placeholder='Search in Naperville'
              type='text'
              name='name'
            />
            <input type='submit' value='Submit' />
          </form>
        )}

        {pathname !== "/" && (
          <Buisness name={pathname.slice(1).replace(/%20/g, " ")} data={data} />
        )}

        {pathname === "/" &&
          (data.length < 1 ? (
            <img src={logo} className='App-logo' alt='logo' />
          ) : (
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
          ))}
      </header>
    </div>
  );
}

export default App;
