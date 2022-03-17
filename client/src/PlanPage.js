import React, { useState, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import "./PlanPage.css";
import {
  DirectionsService,
  DirectionsRenderer,
  Polyline,
  DistanceMatrixService,
} from "@react-google-maps/api";
import Map from "./Map";
import { restaurantObjects } from "./utils";
const pathVisibilityDefaults = {
  strokeOpacity: 0.9,
  strokeWeight: 6,
};
const pathOptions = {
  strokeColor: "#FF0000",
  fillColor: "#FF0000",
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
  ...pathVisibilityDefaults,
};
const dimStyle = {
  color: "dimgrey",
  background: "#6969695c",
};
const startingSearchIndex = 0;

const PlanPage = ({ center, setCenter, data }) => {
  if (!data) {
    data = restaurantObjects;
  }
  const derivedData = data.map((x) => {
    return { name: x.name, coordinates: x.coordinates };
  });
  derivedData.unshift({
    name: "starting Location",
    coordinates: { latitude: center.lat, longitude: center.lng },
  });
  const [currIdx, setIdx] = useState(startingSearchIndex);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(center);
  const [response, setResponse] = useState(null);
  const [distanceMatrixServiceResponse, setDistanceMatrixServiceResponse] =
    useState(null);
  const [path, setPath] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  //console.log(travelMode, "travelMode");
  useEffect(() => {
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };
    setDestination(lastDestination);
  }, []);

  const getWayPoints = () => {
    if (currIdx === startingSearchIndex) {
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
      return thepoints;
    } else {
      return null;
    }
  };

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
    checked && setTravelMode("TRANSIT");
    setResponse(null);
  };

  const checkWalking = ({ target: { checked } }) => {
    checked && setTravelMode("WALKING");
    setResponse(null);
  };

  //console.log(origin, "origin");
  const origin1 = { lat: 55.93, lng: -3.118 };
  const origin2 = "Greenwich, England";
  const destinationA = "Stockholm, Sweden";
  const destinationB = { lat: 50.087, lng: 14.421 };

  useEffect(() => {
    const curr = document.getElementById(`panel-${currIdx}`);
    if (curr) {
      curr.innerHTML = "";
    }
  }, [currIdx]);

  const handleSelectBox = (boxIndex) => {
    if (boxIndex === currIdx) return alert("already here");
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

  return (
    <div className="row">
      <div className="col col-left side-p-10">
        <div className={"plan-map-container"}>
          {/* <div className="">
            <div className="">
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

            <div className="">
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

            <div className="">
              <input
                disabled={currIdx === startingSearchIndex}
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

            <div className="">
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
          </div> */}

          <div className="map-card-controls">
            <div style={{ display: "flex" }}>
              <button
                className="map-controls"
                style={currIdx <= 0 ? dimStyle : null}
                disabled={currIdx <= 0 ? true : false}
                onClick={() => prevDestination()}
              >
                {currIdx === startingSearchIndex + 1 ? "Full Plan" : "Previous"}
              </button>
              <button
                style={currIdx >= derivedData.length - 1 ? dimStyle : null}
                className="map-controls"
                disabled={currIdx >= derivedData.length - 1 ? true : false}
                onClick={() => nextDestination()}
              >
                {currIdx === startingSearchIndex ? "Start" : "Next"}
              </button>
            </div>
          </div>

          <main className={"map-wrapper"}>
            <Map center={center}>
              {/* {!distanceMatrixServiceResponse && (
                <DistanceMatrixService
                  options={{
                    origins: [origin1],
                    destinations: [destinationB],
                    travelMode: "DRIVING",
                  }}
                  callback={(response) => {
                    if (response !== null) {
                      //console.log(response, "the resp from directions matrix")
                      setDistanceMatrixServiceResponse(response);
                    } else {
                      //console.log("something else happened");
                    }
                  }}
                />
              )} */}

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
                        const leg = response.routes[0].legs[0];
                        //console.log(leg, "leg");
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
                        currIdx === startingSearchIndex ? "red" : "#604ca6c7",
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
              {/* {path && (
                <Polyline
                  onLoad={() => //console.log("drawing polyline")}
                  path={path}
                  options={pathOptions}
                />
              )} */}
            </Map>
          </main>
        </div>
      </div>

      <div className="col plan-col-right">
        <div className="plan-directions-container">
          {data.map((location, idx, arr) => {
            let previous = arr[idx - 1];
            return (
              <div
                class="plan-card-shell"
                key={location.id}
                onClick={() => handleSelectBox(idx + 1)}
              >
                <div class="card">
                  <div class="points-container">
                    <div class="numberCircle">
                      {String.fromCharCode("A".charCodeAt(0) + idx)}
                    </div>
                    <div class="line"></div>
                    <div class="numberCircle">
                      {String.fromCharCode("B".charCodeAt(0) + idx)}
                    </div>
                  </div>
                  <div class="locations">
                    <div class="text top">
                      <p>{previous ? previous.name : "Your location"}</p>
                    </div>
                    <div class="text">
                      <p>{location.name}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={idx + 1 === currIdx ? "none" : "hidden"}
                  id={`panel-${idx + 1}`}
                />
              </div>
            );
          })}
        </div>
        <div class="fadedScroller_fade"></div>
      </div>
    </div>
  );
};

export default PlanPage;
