import React, { useState, useEffect } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import Map from "./Map";

const Direction = ({ data, center }) => {
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [response, setResponse] = useState(null);
  const [path, setPath] = useState(null);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    setOrigin(center);
  }, [center]);

  useEffect(() => {
    if (data.length > 0) {
      const finalDestination = {
        lat: data[data.length - 1].coordinates.latitude,
        lng: data[data.length - 1].coordinates.longitude,
      };
      setDestination(finalDestination);
      // setCurrIdx(currIdx + 1);
    }
  }, [data]);

  const pathOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };
  const getWayPoints = () => {
    return data.slice(1, data.length - 1).map((destination) => {
      return {
        location: {
          lat: destination.coordinates.latitude,
          lng: destination.coordinates.longitude,
        },
        stopover: true,
      };
    });
  };

  return (
    <div className={"map-container"}>
      <main className={"map-wrapper"}>
        <Map center={origin}>
          {!response && !path && destination && origin && (
            <DirectionsService
              // required
              options={{
                destination: destination,
                origin: origin,
                waypoints: getWayPoints(),
                travelMode: "DRIVING",
              }}
              // required
              callback={(response) => {
                console.log(response);
                if (response !== null) {
                  if (response.status === "OK") {
                    console.log("response =", response);
                    setResponse(response);
                  } else {
                    console.log("response: ", response);
                    console.log(origin, "org");
                    console.log(destination, "dest");
                    setPath([origin, destination]);
                    setZoom(3);
                  }
                }
              }}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              // required
              options={{
                directions: response,
              }}
            />
          )}

          {path && (
            <Polyline
              onLoad={() => console.log("drawing polyline")}
              path={path}
              options={pathOptions}
            />
          )}
        </Map>
      </main>
    </div>
  );
};

export default Direction;
