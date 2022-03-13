import { MarkerClusterer, Marker } from "@react-google-maps/api";
import Map from "./Map";
import { restaurantObjects } from "./utils.js";
import { OverlayView } from "@react-google-maps/api";
import List from "./List";
const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}

const NavMap = ({ BuisnessData: data, center }) => {
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }

  const result = data.map((buisness) => {
    console.log({ buisness });
    return {
      name: buisness.name,
      img: buisness.image_url,
      location: {
        lat: buisness.coordinates.latitude,
        lng: buisness.coordinates.longitude,
      },
    };
  });

  console.log(result);

  const onClick = () => {
    console.info("I have been clicked!");
  };

  return (
    <>
      <div class="header">
        <h1>Header</h1>
        <p>Resize the browser window to see the responsive effect.</p>
      </div>
      <div class="row">
        <div class="column side">
          <List places={result} />
        </div>
        <div class="column middle">
          <div className="multi-map-container">
            <div className="multi-map-wrapper">
              <Map center={center}>
                <MarkerClusterer options={options}>
                  {(clusterer) =>
                    result.map((location) => (
                      <OverlayView
                        key={createKey(location)}
                        position={{
                          lat: location.location.lat,
                          lng: location.location.lng,
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        clusterer={clusterer}
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
                            onClick={onClick}
                            type="button"
                          >
                            Click me
                          </button>
                        </div>
                      </OverlayView>
                    ))
                  }
                </MarkerClusterer>
              </Map>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMap;
