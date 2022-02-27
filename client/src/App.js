import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Sortable from "./Sortable";
import BigCalendar from "./BigCalendar";
// import Directions from "./Directions";
import ModifiedDirections from "./ModifiedDirections";
import Login from "./Login";
import Navbar from "./Navbar";
function App() {
  const [initialReq, setInitialReq] = useState(false);
  const [data, setData] = useState([]);
  const [center, setCenter] = useState({ lat: 42.009933, lng: -87.70515 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          const { user } = resObject;
          setUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  console.log(data, "data");
  return (
    <div className='App'>
      <Router>
        <Navbar user={user} />

        <Routes>
          <Route
            path='/bigCalendar'
            element={user ? <Navigate to='/' /> : <BigCalendar />}
          />
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/'
            exact
            element={
              <SearchPage
                user={user}
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
          {/* <Route
            path='/directions'
            element={
              <Directions data={data} center={center} setCenter={setCenter} />
            }
          /> */}
          <Route path='/sort' element={<Sortable />} />
          <Route
            path='/modified'
            element={
              <ModifiedDirections
                // data={data}
                center={center}
                setCenter={setCenter}
              />
            }
          />
          <Route path='/category' element={<MultiSelectAsync />} />
          <Route path='/map' element={<NavMap data={data} center={center} />} />
          {/* <Route path='*' element={<Navigate to='/' />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
