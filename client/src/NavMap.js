import { useEffect, useState } from "react";
import Map from "./Map";
import { restaurantObjects } from "./utils.js";
import { OverlayView } from "@react-google-maps/api";
import List from "./List";
import dateFnsFormat from "date-fns/format";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import dateFnsParse from "date-fns/parse";
import { DateUtils } from "react-day-picker";
import { getNextDayOfTheWeek, weekDays } from "./utils.js";
import { v4 as uuidv4 } from "uuid";
const { add, isSameDay } = require("date-fns");

const NavMap = ({ BuisnessData: data, center }) => {
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }

  const [defaultCenter, setDefaultCenter] = useState(center);
  const [zoom, setZoom] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [result, setResult] = useState([]);
  useEffect(() => {
    const result = data
      .filter((buisness) => buisness.hours)
      .flatMap((buisness) => {
        console.log(buisness, "buisness");
        const { hours } = buisness;
        const shifts = hours[0].open.map((shift) => {
          const shift_hours_start = [
            parseInt(shift.start.slice(0, 2)),
            parseInt(shift.start.slice(2)),
          ];

          const shift_hours_end = [
            parseInt(shift.end.slice(0, 2)),
            parseInt(shift.end.slice(2)),
          ];
          const start = new Date(
            getNextDayOfTheWeek(weekDays[shift.day]).setHours(
              shift_hours_start[0],
              shift_hours_start[1],
              0
            )
          );
          let end = new Date(
            getNextDayOfTheWeek(weekDays[shift.day]).setHours(
              shift_hours_end[0],
              shift_hours_end[1],
              0
            )
          );
          if (shift.is_overnight || shift.end === "0000") {
            // console.log("reached the case to add 24 hours");
            end = add(end, {
              days: 1,
            });
          }

          const Shift = {
            id: uuidv4(),
            title: buisness.name,
            name: buisness.name,
            img: buisness.image_url,
            start,
            end,
            location: {
              lat: buisness.coordinates.latitude,
              lng: buisness.coordinates.longitude,
            },
            all_day:
              shift_hours_end[0] + shift_hours_end[1] === 0 ? true : false,
          };
          return Shift;
        });
        return shifts;
      });
    const newResult = result.filter((shift) =>
      isSameDay(defaultDate, shift.start)
    );
    setResult(newResult);
  }, [data, defaultDate]);

  const onClick = ({ id, location }) => {
    setSelectedLocation(id);
    const newCenter = { lat: location.lat, lng: location.lng };
    setDefaultCenter(newCenter);
    setZoom(14);
  };

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  const FORMAT = "MM/dd/yyyy";
  console.log(defaultCenter, "asdfs");
  return (
    <>
      <div className="header">
        {/* <h1>{format(defaultDate, "'Happenings on' eeee LLLL wo")}</h1> */}
        <div className="left">
          <DayPickerInput
            onDayChange={(start) => setDefaultDate(start)}
            formatDate={formatDate}
            format={FORMAT}
            placeholder={`${dateFnsFormat(defaultDate, FORMAT)}`}
            parseDate={parseDate}
          />
        </div>
      </div>
      <div className="row">
        <div className="column side">
          <List places={result} childClicked={selectedLocation} />
        </div>
        <div className="column middle">
          <div className="multi-map-container">
            <div className="multi-map-wrapper">
              <Map
                zoom={zoom}
                center={defaultCenter}
                setZoom={setZoom}
                // options={HomeMapOptions}
              >
                {result.map((location) => (
                  <OverlayView
                    key={uuidv4()}
                    position={{
                      lat: location.location.lat,
                      lng: location.location.lng,
                    }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <button
                      className="button-component"
                      onClick={() => onClick(location)}
                    >
                      {location.id === selectedLocation
                        ? location.name
                        : location.name.length > 10
                        ? location.name.slice(0, 10) + ".."
                        : location.name}

                      <span class="Badge">
                        4 <span class="u-hiddenVisually">Unread Messages</span>
                      </span>
                    </button>
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
