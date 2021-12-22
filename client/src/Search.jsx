import { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import Register from "./Register.jsx";
import Map from "./Map";

const SearchPage = ({ setInitialReq, data, setData }) => {
  const [place, setPlace] = useState("");
  const [term, setTerm] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalShowing, setisModalShowing] = useState(false);
  const [center, setCenter] = useState({
    lat: 41.8789,
    lng: -87.6359,
  });

  return (
    <>
      {error === "" && !loading && data.length === 0 && (
        <p>search a location</p>
      )}
      <SearchForm
        setLoading={setLoading}
        setCenter={setCenter}
        setData={setData}
        setisModalShowing={setisModalShowing}
        setInitialReq={setInitialReq}
        setError={setError}
        loading={loading}
        data={data}
        place={place}
        setPlace={setPlace}
        term={term}
        setTerm={setTerm}
      />
      <WrappedMap className='center shadow mt-20 p-20 w-70 vh-35'>
        <Map center={center} />
      </WrappedMap>
      {/* <button onClick={() => setRegister(!register)}>
        {register ? "X" : "Claim Buisness"}
      </button>
      {register && <Register />} */}

      {error === "" ? (
        loading ? (
          <img src={logo} className='App-logo' alt='logo' />
        ) : data.length > 0 && isModalShowing ? (
          <Modal setisModalShowing={setisModalShowing} data={data}>
            Results for {term} in {place}
          </Modal>
        ) : null
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
};

const SearchForm = ({
  setLoading,
  setCenter,
  setData,
  setisModalShowing,
  setInitialReq,
  setError,
  loading,
  data,
  place,
  setPlace,
  term,
  setTerm,
}) => {
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
    <div className='shadow center mt-20 p-20 w-70'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='search-inputs shadow center p-6'>
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
        <div className='submit-container center mt-10'>
          <input
            className='btn-wide'
            type='submit'
            value='Submit'
            disabled={loading || term.length < 1}
          />
        </div>
        {data.length > 0 && (
          <div className='open-container center mt-10'>
            <button
              className='btn-wide'
              value='Open'
              disabled={loading}
              onClick={(e) => handleModalOpen(e)}
            >
              Open Modal
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

const Modal = ({ setisModalShowing, data, children }) => {
  return (
    <div className='modal'>
      <div className='modal-content center p-20 w-80'>
        <span className='close' onClick={() => setisModalShowing(false)}>
          &times;
        </span>
        <p>{children}</p>
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {data.map((buisness) => {
            return (
              <li key={buisness.id}>
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
  );
};

const WrappedMap = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default SearchPage;
