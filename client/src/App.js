import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log("uese");
    axios.get("/api").then((data) => {
      console.log(data);
      setData(data.message);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{!data ? "Loading here..." : data}</p>
      </header>
    </div>
  );
}

export default App;
