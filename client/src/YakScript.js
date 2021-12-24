import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const librariesArray = ["places"];
function YakScript({ children }) {
  const [isGoogleMapScriptLoaded] = useState(
    window.google && window.google.maps
  );
  if (isGoogleMapScriptLoaded) {
    console.log("do not load google script");
    return children;
  }
  console.log("load google script");
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={librariesArray}
    >
      {children}
    </LoadScript>
  );
}
export default YakScript;
