import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 42.02793,
  lng: -87.71965,
};

export default function Map(props) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        {...props}
      >
        <>{props.children}</>
      </GoogleMap>
    </LoadScript>
  );
}

// export default React.memo(Map);
