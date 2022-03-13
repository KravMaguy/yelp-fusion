import { useState } from "react";
import Map from "./Map";
import { restaurantObjects } from "./utils.js";
import { OverlayView } from "@react-google-maps/api";
import List from "./List";

function createKey({ location }) {
  return location.lat + location.lng;
}

const NavMap = ({ BuisnessData: data, center }) => {
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }
  const [childClicked, setChildClicked] = useState(null);

  const result = data.map((buisness) => {
    return {
      ...buisness,
      name: buisness.name,
      img: buisness.image_url,
      location: {
        lat: buisness.coordinates.latitude,
        lng: buisness.coordinates.longitude,
      },
    };
  });

  const onClick = (id) => {
    setChildClicked(id);
  };

  return (
    <>
      <div className="header">
        <h1>Header</h1>
        <p>Resize the browser window to see the responsive effect.</p>
      </div>
      <div className="row">
        <div className="column side">
          <List places={result} childClicked={childClicked} />
        </div>
        <div className="column middle">
          <div className="multi-map-container">
            <div className="multi-map-wrapper">
              <Map center={center}>
                {result.map((location) => (
                  <OverlayView
                    key={createKey(location)}
                    position={{
                      lat: location.location.lat,
                      lng: location.location.lng,
                    }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div className="window-overlay">
                      <h3>{location.name}</h3>
                      <img
                        src={location.img}
                        className="thumbnail"
                        alt={location.name}
                      />

                      <button
                        className="window-btn"
                        onClick={() => onClick(location.id)}
                        type="button"
                      >
                        Click me
                      </button>
                    </div>
                  </OverlayView>
                ))}
              </Map>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMap;
