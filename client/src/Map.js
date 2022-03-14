import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoadMap = useCallback(setMap, []); // set map once map has loaded

  const { center, zoom, setZoom } = props;

  return (
    <GoogleMap
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
