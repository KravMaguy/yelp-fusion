import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Buisness from "./Buisness";
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
