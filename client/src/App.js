import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Buisness from "./Buisness";
import SearchPage from "./Search";
import MultiSelectAsync from "./MultiSelect";
import Cal from "./Cal";
import NavMap from "./NavMap";
function App() {
  const [initialReq, setInitialReq] = useState(false);
  const [data, setData] = useState([]);
  const [center, setCenter] = useState({
    lat: 41.8789,
    lng: -87.6359,
  });

  console.log(data, "data");
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <SearchPage
                setInitialReq={setInitialReq}
                data={data}
                setData={setData}
                center={center}
                setCenter={setCenter}
              />
            }
          />
          <Route path='/cal' exact element={<Cal />} />
          <Route
            path='/buisness/:id'
            element={<Buisness initialRequest={initialReq} />}
          />
          <Route path='/category' element={<MultiSelectAsync />} />
          <Route path='/map' element={<NavMap data={data} center={center} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
