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
import Categories from "./Categories";
import MultiSelect from "./MultiSelect";
import Cal from "./Cal";
function App() {
  const [initialReq, setInitialReq] = useState(false);
  const [data, setData] = useState([]);
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
              />
            }
          />
          <Route path='/cal' exact element={<Cal />} />
          <Route path='/multiselect' exact element={<MultiSelect />} />
          <Route path='/categories' exact element={<Categories />} />
          <Route
            path='/buisness/:id'
            element={<Buisness initialRequest={initialReq} />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
