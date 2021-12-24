import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map(props) {
  const { center } = props;
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <>{props.children}</>
    </GoogleMap>
  );
}
