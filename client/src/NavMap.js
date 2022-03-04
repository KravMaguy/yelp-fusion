import { MarkerClusterer, Marker } from "@react-google-maps/api";

import Map from "./Map";

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}
const NavMap = ({ data, center }) => {
  const result = data.map((buisness) => ({
    lat: buisness.coordinates.latitude,
    lng: buisness.coordinates.longitude,
  }));

  return (
    <div className='map-container'>
      <div className='map-wrapper'>
        <Map center={center}>
          <MarkerClusterer options={options}>
            {(clusterer) =>
              result.map((location) => (
                <Marker
                  label={"C"}
                  key={createKey(location)}
                  position={location}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
        </Map>
      </div>
    </div>
  );
};

export default NavMap;
