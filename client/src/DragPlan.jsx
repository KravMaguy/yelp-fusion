import { Marker } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";

import "./PlanPage.css";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { MdLink } from "react-icons/md";
import Map from "./Map";
import { restaurantObjects, maObjs } from "./utils";
import DragPlanDirections from "./DragPlanDirections";
const pathVisibilityDefaults = {
  strokeOpacity: 0.9,
  strokeWeight: 6,
};

const dimStyle = {
  color: "dimgrey",
  background: "#6969695c",
};
const startingSearchIndex = 0;

const DragPlan = ({ center, data }) => {
  if (!data) {
    data = maObjs;
  }

  const [derivedData, setDerivedData] = useState([]);
  const [currIdx, setIdx] = useState(startingSearchIndex);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(center);
  const [response, setResponse] = useState(null);
  const [path, setPath] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  useEffect(() => {
    const derivedData = data.map((x) => {
      return { id: x.id, name: x.name, coordinates: x.coordinates };
    });
    derivedData.unshift({
      name: "starting Location",
      coordinates: {
        id: "starting id",
        latitude: center.lat,
        longitude: center.lng,
      },
    });
    setDerivedData(derivedData);
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };
    setDestination(lastDestination);
  }, []);

  const getWayPoints = (param) => {
    console.log("getWayPoints Ran");
    console.log("in getWaypoints the curr idx ", currIdx);
    console.log("the param ", param);
    if (currIdx === startingSearchIndex) {
      console.log("reached the multiblock");
      const myPoints = derivedData.slice(
        startingSearchIndex + 1,
        derivedData.length - 1
      );
      const thepoints = myPoints.map((destination) => {
        return {
          location: {
            lat: destination.coordinates.latitude,
            lng: destination.coordinates.longitude,
          },
          stopover: true,
        };
      });

      console.log(thepoints, "here are the final points $$$$$$");
      return thepoints;
    } else {
      return null;
    }
  };

  console.log(origin, "origin");
  console.log(destination, "destination");

  const nextDestination = () => {
    if (currIdx !== startingSearchIndex) {
      setOrigin(destination);
    }
    const nextDestination = {
      lat: derivedData[currIdx + 1].coordinates.latitude,
      lng: derivedData[currIdx + 1].coordinates.longitude,
    };
    setDestination(nextDestination);
    setIdx(currIdx + 1);
    setResponse(null);
  };

  const prevDestination = () => {
    if (currIdx === startingSearchIndex + 1) {
      travelMode === "TRANSIT" && setTravelMode("DRIVING");

      setIdx(startingSearchIndex);
      const startingDestination = {
        lat: derivedData[startingSearchIndex].coordinates.latitude,
        lng: derivedData[startingSearchIndex].coordinates.longitude,
      };
      setOrigin(startingDestination);
      const lastDestination = {
        lat: derivedData[derivedData.length - 1].coordinates.latitude,
        lng: derivedData[derivedData.length - 1].coordinates.longitude,
      };
      setDestination(lastDestination);
    } else {
      setDestination(origin);
      const prevOrigin = {
        lat: derivedData[currIdx - 2].coordinates.latitude,
        lng: derivedData[currIdx - 2].coordinates.longitude,
      };
      setOrigin(prevOrigin);
      setIdx(currIdx - 1);
    }
    setResponse(null);
  };

  const wayPoints = [origin, destination];

  const checkDriving = ({ target: { checked } }) => {
    checked && setTravelMode("DRIVING");
    setResponse(null);
  };

  const checkBicycling = ({ target: { checked } }) => {
    checked && setTravelMode("BICYCLING");
    setResponse(null);
  };

  const checkTransit = ({ target: { checked } }) => {
    console.log("transite cliecke");
    checked && setTravelMode("TRANSIT");
    setResponse(null);
  };

  const checkWalking = ({ target: { checked } }) => {
    checked && setTravelMode("WALKING");
    setResponse(null);
  };

  useEffect(() => {
    const curr = document.getElementById(`panel-${currIdx}`);
    if (curr) {
      curr.innerHTML = "";
    }
  }, [currIdx, travelMode]);

  const handleSelectBox = (boxIndex) => {
    if (boxIndex === currIdx) return;
    const origin = {
      lat: derivedData[boxIndex - 1].coordinates.latitude,
      lng: derivedData[boxIndex - 1].coordinates.longitude,
    };
    const destination = {
      lat: derivedData[boxIndex].coordinates.latitude,
      lng: derivedData[boxIndex].coordinates.longitude,
    };
    setIdx(boxIndex);
    setOrigin(origin);
    setDestination(destination);
    setResponse(null);
  };

  const removeLocation = (id) => {
    console.log(id);
    const index = derivedData.findIndex((obj) => obj.id === id);
    console.log("derived data", derivedData);
    console.log({ index });
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const filteredData = derivedData
      .slice(0, index)
      .concat(derivedData.slice(index + 1));
    console.log(filteredData, "the filtered");
    setDerivedData(filteredData);
    setIdx(0);

    const destination = {
      lat: filteredData[filteredData.length - 1].coordinates.latitude,
      lng: filteredData[filteredData.length - 1].coordinates.longitude,
    };
    setOrigin(origin);
    setDestination(destination);
    setResponse(null);
  };

  return (
    <>
      <div className="row">
        <div className="col col-left side-p-10">
          <div className="map-destination-links-container">
            {derivedData.map(
              (x, idx) =>
                idx > 0 && (
                  <div
                    className="css-1rhbuit-multiValue"
                    onClick={() => removeLocation(x.id)}
                  >
                    <div className="css-12jo7m5">
                      <a href="#">{x.name}</a>
                    </div>
                    <div
                      role="button"
                      className="css-xb97g8"
                      aria-label={`remove ${x.name}`}
                    >
                      <svg
                        height={14}
                        width={14}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        className="css-tj5bde-Svg"
                      >
                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                      </svg>
                    </div>
                  </div>
                )
            )}
          </div>
          <div className="plan-map-container">
            <div className="map-card-controls">
              <div style={{ display: "flex" }}>
                <button
                  className="map-controls"
                  style={currIdx <= 0 ? dimStyle : null}
                  disabled={currIdx <= 0 ? true : false}
                  onClick={() => prevDestination()}
                >
                  {currIdx === startingSearchIndex + 1
                    ? "Full Plan"
                    : "Previous"}
                </button>
                <button
                  style={currIdx >= derivedData.length - 1 ? dimStyle : null}
                  className="map-controls plan-next-btn"
                  disabled={currIdx >= derivedData.length - 1 ? true : false}
                  onClick={() => nextDestination()}
                >
                  {currIdx === startingSearchIndex ? "Start" : "Next"}
                </button>
              </div>

              <button class="pure-material-button-text">
                See it on Google
              </button>
            </div>
            <main className={"map-wrapper"}>
              <Map center={center}>
                {!response && !path && destination && origin && (
                  <DirectionsService
                    options={{
                      origin: origin,
                      destination: destination,
                      waypoints: getWayPoints(),
                      travelMode: travelMode,
                    }}
                    callback={(response) => {
                      if (response !== null) {
                        if (response.status === "OK") {
                          setResponse(response);
                        } else {
                          setPath([origin, destination]);
                        }
                      }
                    }}
                  />
                )}

                {response !== null && (
                  <DirectionsRenderer
                    options={{
                      suppressMarkers: !getWayPoints() ? true : false,

                      directions: response,
                      polylineOptions: {
                        strokeColor:
                          currIdx === startingSearchIndex
                            ? "black"
                            : "#604ca6c7",
                        strokeOpacity:
                          currIdx !== startingSearchIndex
                            ? pathVisibilityDefaults.strokeOpacity
                            : null,
                        strokeWeight:
                          currIdx !== startingSearchIndex
                            ? pathVisibilityDefaults.strokeWeight
                            : null,
                      },
                    }}
                    directions={response}
                    panel={document.getElementById(`panel-${currIdx}`)}
                  />
                )}
                {!getWayPoints() &&
                  wayPoints.map((waypoint, idx) => {
                    const letter = String.fromCharCode(
                      "A".charCodeAt(0) + currIdx + idx - 1
                    );
                    return (
                      <Marker
                        key={letter}
                        position={{
                          lat: waypoint.lat,
                          lng: waypoint.lng,
                        }}
                        label={{ text: letter, color: "white" }}
                      />
                    );
                  })}
              </Map>
            </main>
          </div>
        </div>

        <DragPlanDirections
          currIdx={currIdx}
          setIdx={setIdx}
          handleSelectBox={handleSelectBox}
          response={response}
          derivedData={derivedData}
          setResponse={setResponse}
          setOrigin={setOrigin}
          setDestination={setDestination}
          travelMode={travelMode}
          setTravelMode={setTravelMode}
          checkBicycling={checkBicycling}
          checkWalking={checkWalking}
          checkTransit={checkTransit}
          checkDriving={checkDriving}
          setDerivedData={setDerivedData}
          data={data}
          center={center}
        />
      </div>
    </>
  );
};

export default DragPlan;
