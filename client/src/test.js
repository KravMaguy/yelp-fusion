import { useState } from "react";
import Map from "./Map";
import { restaurantObjects } from "./utils.js";
import { OverlayView } from "@react-google-maps/api";
import List from "./List";
import dateFnsFormat from "date-fns/format";
import format from "date-fns/format";

import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";

function createKey({ location }) {
  return location.lat + location.lng;
}

const NavMap = ({ BuisnessData: data, center }) => {
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }
  const [childClicked, setChildClicked] = useState(null);
  const [defaultDate, setDefaultDate] = useState(new Date());

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

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

  console.log("formeatted: ", format(new Date(), "yyyy-MM-dd"));
  // console.log("yyyy-mm-dd", formatDate(defaultDate, "yyyy-mm-dd"), "en-us");

  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  console.log({ defaultDate });
  const FORMAT = "MM/dd/yyyy";
  // yyyy-mm-dd
  return (
    <>
      <div className="header">
        {/* <h1>{format(defaultDate, "'Happenings on' eeee LLLL wo")}</h1> */}
        {/* <DayPickerInput
          onDayChange={(start) => setDefaultDate(start)}
          formatDate={formatDate}
          format={FORMAT}
          placeholder={`${dateFnsFormat(defaultDate, FORMAT)}`}
          parseDate={parseDate}
        /> */}

        <label for="start">Start date:</label>

        <input type="date" id="start" name="trip-start" />
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
