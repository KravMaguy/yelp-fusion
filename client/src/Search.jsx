import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import Register from "./Register.jsx";
import Map from "./Map";

const Search = ({ setInitialReq }) => {
  const [register, setRegister] = useState(false);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState("");
  const [isModalShowing, setisModalShowing] = useState(false);
  const [center, setCenter] = useState({
    lat: 41.8789,
    lng: -87.6359,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const terms = { term, place };
      const { data } = await axios.post("/api/", terms);
      setLoading(false);
      const { businesses, region } = data;
      const { center } = region;
      const { longitude, latitude } = center;
      setCenter({ lat: latitude, lng: longitude });
      setData(businesses);
      setisModalShowing(true);
      setInitialReq(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleModalOpen = (e) => {
    e.preventDefault();
    setisModalShowing(true);
  };

  return (
    <>
      {error === "" && !loading && data.length === 0 && (
        <p>search a location</p>
      )}
      <div
        style={{
          margin: "auto",
          marginTop: "20px",
          width: "70vw",
          padding: "20px",
          boxShadow:
            "inset 0 -3em 3em rgba(0,0,0,0.1),\n            0 0  0 2px rgb(255,255,255),\n             0.3em 0.3em 1em rgba(0,0,0,0.3)",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className='search-inputs'
            style={{
              margin: "auto",
              padding: "6px",
              boxShadow:
                "inset 0 -3em 3em rgba(0,0,0,0.1),\n            0 0  0 2px rgb(255,255,255),\n             0.3em 0.3em 1em rgba(0,0,0,0.3)",
            }}
          >
            <input
              onChange={(e) => setPlace(e.target.value)}
              placeholder='Enter place to search'
              type='text'
              name='place'
              value={place}
            />
            <input
              onChange={(e) => setTerm(e.target.value)}
              placeholder={`Search in ${place}`}
              type='text'
              name='name'
              value={term}
            />
          </div>
          <div
            className='submit-container'
            style={{
              margin: "auto",
              marginTop: "10px",
            }}
          >
            <input
              style={{ width: "100%", color: "green" }}
              type='submit'
              value='Submit'
              disabled={loading || term.length < 1}
            />
          </div>
          {data.length > 0 && (
            <div
              className='open-container'
              style={{
                margin: "auto",
                marginTop: "10px",
              }}
            >
              <button
                style={{ width: "100%", color: "green" }}
                value='Open'
                disabled={loading || term.length < 1}
                onClick={(e) => handleModalOpen(e)}
              >
                Open Modal
              </button>
            </div>
          )}
        </form>
      </div>

      <div
        style={{
          margin: "auto",
          marginTop: "20px",

          height: "35vh",
          width: "70vw",
          padding: "20px",
          boxShadow:
            "inset 0 -3em 3em rgba(0,0,0,0.1),\n            0 0  0 2px rgb(255,255,255),\n             0.3em 0.3em 1em rgba(0,0,0,0.3)",
        }}
      >
        <Map center={center} />
      </div>
      {/* <button onClick={() => setRegister(!register)}>
        {register ? "X" : "Claim Buisness"}
      </button>
      {register && <Register />} */}

      {error === "" ? (
        loading ? (
          <img src={logo} className='App-logo' alt='logo' />
        ) : data.length > 0 && isModalShowing ? (
          <div
            class='modal'
            style={{
              position: "fixed",
              zIndex: "1",
              paddingTop: "5vh",
              left: "0",
              top: "0",
              width: "100%",
              height: "100%",
              overflow: "auto",
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <div
              class='modal-content'
              style={{
                backgroundColor: "#fefefe",
                margin: "auto",
                padding: "20px",
                border: "1px solid #888",
                width: "80%",
              }}
            >
              <span class='close' onClick={() => setisModalShowing(false)}>
                &times;
              </span>
              <p>Some text in the Modal..</p>
              <ul
                style={{
                  listStyleType: "none",
                }}
              >
                {data.map((buisness) => {
                  return (
                    <li>
                      <Link
                        key={buisness.id}
                        state={{ businessesName: buisness.name }}
                        to={`buisness/${buisness.id}`}
                      >
                        {buisness.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
};

export default Search;
