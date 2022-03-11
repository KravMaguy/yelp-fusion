import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import {
  weekDays,
  restaurantObjects,
  events,
  getNextDayOfTheWeek,
  localizer,
  gapiConfig,
  utilAlert,
  gcalConfig,
  formatLocal,
  formatTooltipTime,
  gapiResponse,
} from "./utils";
import TimeSelectionModal from "./TimeSelectionModal";
import { useParams, useNavigate, Link } from "react-router-dom";

const DragAndDropCalendar = withDragAndDrop(Calendar);

function BigCalendar({ BuisnessData: data, user }) {
  const mockGapi = true;
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }
  let lastHourId = events[events.length - 1].id + 1;

  data.forEach((obj) => {
    if (obj.hours) {
      const hours = obj.hours[0].open;
      for (let i = 0; i < hours.length; i++) {
        hours[i].id = lastHourId;
        lastHourId++;
      }
    }
  });

  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState(events);
  const [selectedEventObjects, setSelectedEventObjects] = useState([]);
  const [userTimes, setUserTimes] = useState([]);

  const [name, setName] = useState("");
  const [GcalProfile, setGcalProfile] = useState("");
  const [isUserTimesDisplayed, setIsUserTimesDisplayed] = useState(false);

  const [isModalShowing, setIsModalShowing] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const params = useParams();
  const { id } = params;

  const handleSelectedUserProfileEvent = (event) => {
    const { id } = event;
    if (!id) return utilAlert("gcalProfile", event);
    setIsModalShowing(true);
    setSelectedEventId(id);
  };

  const handleSelectedEvent = (event) => {
    console.log(event, "this event on handle Select");
    if (params.id === GcalProfile) return handleSelectedUserProfileEvent(event);
    const { id } = event;
    if (!allEvents.some((obj) => obj.id === id))
      return utilAlert("gcal", event);
    if (selectedEventObjects.some((obj) => obj.id === id)) {
      const arr = selectedEventObjects.filter((obj) => obj.id !== id);
      setSelectedEventObjects(arr);
    } else {
      setSelectedEventObjects([...selectedEventObjects, event]);
    }
  };

  useEffect(() => {
    const calendarObject = data.find((element) => element.id === id);
    if (!calendarObject) return;
    const { name, hours, is_claimed } = calendarObject;
    setName(name);
    if (!hours || !is_claimed) return;
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
      const end = new Date(
        getNextDayOfTheWeek(weekDays[shift.day]).setHours(
          shift_hours_end[0],
          shift_hours_end[1],
          0
        )
      );

      const Shift = {
        id: shift.id,
        title: name,
        start,
        end,
        all_day: shift_hours_end[0] + shift_hours_end[1] === 0 ? true : false,
      };
      return Shift;
    });
    setAllEvents((allEvents) => [...allEvents, ...shifts]);
  }, [data, id]);

  const handleSelectCal = (e) => {
    setAllEvents(events);
    navigate(`/bigCalendar/${e.target.value}`);
  };

  const displayEvents = (events) => {
    const userCaltimes = events.map((event) => {
      return {
        title: event.summary
          ? event.summary
          : event.description
          ? event.description
          : "no title provided",
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
      };
    });
    setUserTimes([...userCaltimes]);
  };

  const displayTimes = () => {
    function handleResponse(response) {
      const { result } = response;
      const { summary, items } = result;
      const profile = summary.slice(0, summary.indexOf("@"));
      setGcalProfile(profile);
      displayEvents(items);
    }

    if (userTimes.length === 0 && !isUserTimesDisplayed) {
      if (!mockGapi) {
        const gapi = window.gapi;
        const { apiKey, clientId, discoveryDocs, scope } = gapiConfig;
        gapi.load("client:auth2", () => {
          gapi.client.init({
            apiKey,
            clientId,
            discoveryDocs,
            scope,
          });
          gapi.client.load("calendar", "v3", () => console.log("gapi loaded"));
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              gapi.client.calendar.events.list(gcalConfig).then((response) => {
                handleResponse(response);
              });
            });
        });
      } else {
        handleResponse(gapiResponse);
      }
    }
    setIsUserTimesDisplayed(true);
  };

  const hideTimes = () => {
    setIsUserTimesDisplayed(false);
  };

  useEffect(() => {
    if (!GcalProfile || id !== GcalProfile) return;
    setAllEvents(events);
    setIsUserTimesDisplayed(true);
  }, [GcalProfile, id]);

  const GetSelectableCalendars = () => {
    const selectableCalendars = data.map((option) => {
      return { id: option.id, name: option.name };
    });
    if (GcalProfile) {
      selectableCalendars.push({ id: GcalProfile, name: GcalProfile });
    }
    return selectableCalendars;
  };

  return (
    <div className="App">
      {isModalShowing && (
        <TimeSelectionModal
          data={data}
          selectedEventObjects={selectedEventObjects}
          setSelectedEventObjects={setSelectedEventObjects}
          setSelectedEventId={setSelectedEventId}
          setIsModalShowing={setIsModalShowing}
          selectedEventId={selectedEventId}
        />
      )}
      <h1>
        {GcalProfile && id === GcalProfile
          ? GcalProfile
          : allEvents.length === events.length
          ? name + " has no listed times"
          : name}
      </h1>
      {GcalProfile && id !== GcalProfile && (
        <Link to={`/bigCalendar/${GcalProfile}`}>{GcalProfile}'s Calendar</Link>
      )}
      <div>
        <label>
          Change Calendar{" "}
          <select onChange={handleSelectCal}>
            {GetSelectableCalendars().length > 0 ? (
              GetSelectableCalendars().map((option) => (
                <option
                  selected={option.id === id}
                  key={option.id}
                  value={option.id}
                >
                  {option.name}
                </option>
              ))
            ) : (
              <option value="Loading...">
                Getting buisness data please wait...
              </option>
            )}
          </select>
        </label>
      </div>

      <div>
        {id !== GcalProfile && (
          <button onClick={!isUserTimesDisplayed ? displayTimes : hideTimes}>
            {!isUserTimesDisplayed ? "Display" : "Hide"} my times
          </button>
        )}
      </div>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={
          GcalProfile && id === GcalProfile
            ? userTimes.concat(selectedEventObjects)
            : isUserTimesDisplayed
            ? [...allEvents].concat(...userTimes)
            : allEvents
        }
        tooltipAccessor={(event) => {
          return formatTooltipTime(event);
        }}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => handleSelectedEvent(event)}
        style={{ height: 500, margin: "50px" }}
        eventPropGetter={(event) => {
          if (!event.id)
            return {
              className: "greyed-shift",
            };
          if (selectedEventObjects.some((obj) => obj.id === event.id)) {
            return {
              className: "selected-shift",
            };
          }
        }}
      />
    </div>
  );
}

export default BigCalendar;
