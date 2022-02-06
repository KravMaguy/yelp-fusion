import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import Map from "./Map";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import Geocode from "react-geocode";
import LocationSearchInput from "./PlacesAutocomplete";
import Plan from "./Plan";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
Geocode.enableDebug();

const SearchPage = ({ setInitialReq, data, setData, center, setCenter }) => {
  const [place, setPlace] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalShowing, setisModalShowing] = useState(false);
  const [createDisplayPlan, setCreateDisplayPlan] = useState(false);
  const [userCoordinates, setuserCoordinates] = useState(null);

  return (
    <>
      {error === "" && !loading && data.length === 0 ? (
        <>
          <p>search a location</p>
        </>
      ) : (
        <Link to={`/directions`}>Directions</Link>
      )}
      <SearchForm
        userCoordinates={userCoordinates}
        setuserCoordinates={setuserCoordinates}
        setCreateDisplayPlan={setCreateDisplayPlan}
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
      <WrappedMap className='center shadow mt-20 p-20 w-70 vh-35 mb-20'>
        <Map center={center} />
      </WrappedMap>
      {error === "" ? (
        loading ? (
          LoadingScreen(term, place)
        ) : data.length > 0 && (isModalShowing || createDisplayPlan) ? (
          <Modal
            createDisplayPlan={createDisplayPlan}
            setisModalShowing={setisModalShowing}
            setCreateDisplayPlan={setCreateDisplayPlan}
          >
            {createDisplayPlan ? (
              <>
                <Plan data={data} term={term} place={place} />
              </>
            ) : (
              <>
                <p>
                  Results for {term} in {place}
                </p>
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
              </>
            )}
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
  setCreateDisplayPlan,
  setuserCoordinates,
  userCoordinates,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const terms = { term, place };
      const { data } = await axios.post("http://localhost:5000/api/", terms);
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

  const handleCreateDisplayPlan = (e) => {
    e.preventDefault();
    setCreateDisplayPlan(true);
  };

  const runGetLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setuserCoordinates({ latitude, longitude });
        setCenter({ lat: latitude, lng: longitude });
        Geocode.fromLatLng(latitude, longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
            if (address) {
              setPlace(address);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='shadow center mt-20 p-20 w-70'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='search-inputs shadow center p-10'>
          <input
            className='lg-input left-pad-15 mt-b-2'
            onChange={(e) => setTerm(e.target.value)}
            placeholder={`Search in ${place}`}
            type='text'
            name='name'
            value={term}
          />
          <div className='lg-input mt-b-2'>
            <LocationSearchInput
              className='form-control'
              setPlace={setPlace}
              place={place}
              setCenter={setCenter}
            />

            <div onClick={runGetLocation} className='icon'>
              <span>
                {!userCoordinates ? (
                  <MdLocationOff size={18} className='location-icon' />
                ) : (
                  <MdLocationOn
                    size={18}
                    className='location-icon'
                    color={"green"}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className='search-inputs shadow center p-10 mt-20'>
          <div className='center'>
            <input
              className='btn-wide'
              type='submit'
              value='Submit'
              disabled={loading || term.length < 1}
            />
          </div>
          {data.length > 0 && (
            <>
              <div className='center mt-10'>
                <button
                  className='btn-wide'
                  value='Open'
                  disabled={loading}
                  onClick={(e) => handleModalOpen(e)}
                >
                  Show results for {term} in {place}
                </button>
              </div>
              <div className='open-container center mt-10'>
                <button
                  className='btn-wide'
                  value='Open'
                  disabled={loading}
                  onClick={(e) => {
                    handleCreateDisplayPlan(e);
                  }}
                >
                  Create a plan for {term} in {place}
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

const Modal = ({
  createDisplayPlan,
  setisModalShowing,
  children,
  setCreateDisplayPlan,
}) => {
  return (
    <div className='modal'>
      <div className='modal-content center p-20 w-80'>
        <span
          className='close'
          onClick={() => {
            createDisplayPlan
              ? setCreateDisplayPlan(false)
              : setisModalShowing(false);
          }}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

const WrappedMap = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const LoadingScreen = (term, place) => {
  return (
    <div id='loading-screen'>
      <img src={logo} className='App-logo' alt='logo' />
      <p className='pulsate'>
        Loading results for {term} in {place}
      </p>
    </div>
  );
};

export default SearchPage;
