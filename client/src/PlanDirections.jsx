import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
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
        <div
          className="plan-card-shell align-left plan-top-card"
          onClick={() => viewFullPlan()}
        >
          <div className="mdc-card-wrapper__text-section">
            <div className="demo-card__title">
              <div className="numberCircle red-color white-border">
                {data.length}
              </div>
              <span class="text">Destinations</span>
            </div>
            <div className="demo-card__subhead">
              {distance && Math.round((distance / 1000 / 1.609) * 100) / 100} mi
            </div>
            <div className="demo-card__subhead">
              {time && humanDuration(time)}
            </div>
          </div>
        </div>

        {data.map((location, idx, arr) => {
          let previous = arr[idx - 1];
          return (
            <div
              className="plan-card-shell"
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
