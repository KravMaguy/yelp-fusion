import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
function App() {
  const location = useLocation();
  const { pathname } = location;
  const [data, setData] = useState([]);
  React.useEffect(() => {
    axios.get("/api").then(({ data }) => {
      setData(data.businesses);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        {data.length < 1 ? (
          <img src={logo} className='App-logo' alt='logo' />
        ) : (
          data.map(function (item, i) {
            return (
              <Link key={item.id} to={item.name.trim().replace(/\s/g, "%20")}>
                {item.name}
              </Link>
            );
          })
        )}
      </header>
    </div>
  );
}

export default App;
