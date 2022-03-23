import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapStyle = [
  // {
  //   featureType: "poi",
  //   stylers: [{ visibility: "off" }],
  // },
  // {
  //   featureType: "transit",
  //   elementType: "labels.icon",
  //   stylers: [{ visibility: "off" }],
  // },

  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        color: "#878787",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f9f5ed",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#aee0f4",
      },
    ],
  },
];

export default function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoadMap = useCallback(setMap, []); // set map once map has loaded

  const { center, zoom, setZoom, options } = props;

  return (
    <GoogleMap
      // options={options}
      options={{ clickableIcons: true, styles: mapStyle }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onZoomChanged={() => {
        // when zoom changes
        if (map === null) {
          // make sure we have the instance of the map
          return;
        }
        if (map.zoom !== zoom) {
          // sync map zoom with with the state zoom
          setZoom(map.zoom);
        }
      }}
      onLoad={onLoadMap} // once map is loaded, this will get called
    >
      <>{props.children}</>
    </GoogleMap>
  );
}
