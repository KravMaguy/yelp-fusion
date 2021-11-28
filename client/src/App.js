import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Buisness from "./Buisness";
import Search from "./Search";

function App() {
  const [data, setData] = useState([]);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            exact
            element={<Search data={data} setData={setData} />}
          />
          <Route path='/buisness/:id' element={<Buisness data={data} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
