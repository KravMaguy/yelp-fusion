import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import GmapIcon from "./GmapIcon";
import gmappng from "./img/gmappng.png";
const PlanDirections = ({
  data,
  handleSelectBox,
  currIdx,
  response,
  setResponse,
  setOrigin,
  setDestination,
  setIdx,
  derivedData,
  travelMode,
  setTravelMode,
  checkBicycling,
  checkWalking,
  checkTransit,
  checkDriving,
}) => {
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (!response) return;
    let totalDist = 0;
    let totalTime = 0;
    const myroute = response.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;
      totalTime += myroute.legs[i].duration.value;
    }
    setDistance(totalDist);
    setTime(totalTime);
  }, [response]);

  const viewFullPlan = () => {
    if (currIdx === 0) return;
    travelMode === "TRANSIT" && setTravelMode("DRIVING");

    setIdx(0);
    setResponse(null);
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    setOrigin(origin);
    setDestination(lastDestination);
  };

  function humanDuration(time) {
    return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
  }

  return (
    <div className="col plan-col-right">
      <div className="plan-directions-container">
        <div className="plan-card-shell align-left">
          <div class="parent">
            {" "}
            <div className="child">
              <input
                id="DRIVING"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "DRIVING"}
                onChange={checkDriving}
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>
            <div className="child">
              <input
                id="BICYCLING"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "BICYCLING"}
                onChange={checkBicycling}
              />
              <label className="" htmlFor="BICYCLING">
                Bicycling
              </label>
            </div>
            <div className="child">
              <input
                disabled={currIdx === 0}
                id="TRANSIT"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "TRANSIT"}
                onChange={checkTransit}
              />
              <label className="custom-control-label" htmlFor="TRANSIT">
                Transit
              </label>
            </div>
            <div className="child">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={travelMode === "WALKING"}
                onChange={checkWalking}
              />
              <label className="" htmlFor="WALKING">
                Walking
              </label>
            </div>
          </div>
        </div>

        <div
          className="plan-card-shell align-left plan-top-card"
          onClick={() => viewFullPlan()}
        >
          <div className="plan-flex-container">
            <div className="mdc-card-wrapper__text-section">
              <div className="demo-card__title">
                <div className="numberCircle red-color white-border">
                  {data.length}
                </div>
                <span class="text">Destinations</span>
              </div>
              <div className="demo-card__subhead">
                {distance && Math.round((distance / 1000 / 1.609) * 100) / 100}
                mi
              </div>
              <div className="demo-card__subhead">
                {time && humanDuration(time)}
              </div>
            </div>
            <div>
              <div className="gmaplogo">{/* <GmapIcon /> */}</div>
            </div>
          </div>
        </div>

        {data.map((location, idx, arr) => {
          let previous = arr[idx - 1];

          console.log(previous?.coordinates, "prev");
          console.log(location?.coordinates, "curr");

          // https://www.google.com/maps/dir/41.97025072526612,-87.69260402696997/42.02332221302064,-87.70771022843205/41.99891736625932,-87.81862186689798/
          let url;
          if (previous) {
            url = `https://www.google.com/maps/dir/${previous.coordinates.latitude},${previous.coordinates.longitude}/${location.coordinates.latitude},${location.coordinates.longitude}`;
          }

          return (
            <div
              className={
                idx + 1 === currIdx
                  ? "plan-card-shell selected-overwrite"
                  : "plan-card-shell text-shadow"
              }
              key={location.id}
              onClick={() => handleSelectBox(idx + 1)}
            >
              <div className="card">
                <div className="points-container">
                  <div className="numberCircle">
                    {String.fromCharCode("A".charCodeAt(0) + idx)}
                  </div>
                  <div className="line"></div>
                  <div className="numberCircle">
                    {String.fromCharCode("B".charCodeAt(0) + idx)}
                  </div>
                </div>
                <div className="locations">
                  <div className="text top">
                    <p>{previous ? previous.name : "Your location"}</p>
                  </div>
                  <div className="text">
                    <p>{location.name}</p>
                  </div>
                </div>

                <div className="gmaplogo">
                  <a target="new" href={url}>
                    {/* <GmapIcon /> */}
                  </a>
                </div>
              </div>

              <div
                className={idx + 1 === currIdx ? "none mt-40" : "hidden"}
                id={`panel-${idx + 1}`}
              />
            </div>
          );
        })}
      </div>
      <div className="fadedScroller_fade"></div>
    </div>
  );
};

export default PlanDirections;
