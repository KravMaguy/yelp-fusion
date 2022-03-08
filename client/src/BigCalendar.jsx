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
  convertToTimeInput,
  formatLocal,
} from "./utils";
import set from "date-fns/set";
import { useParams, useNavigate, Link } from "react-router-dom";

const DragAndDropCalendar = withDragAndDrop(Calendar);

function BigCalendar({ BuisnessData: data, user }) {
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
    if (userTimes.length === 0 && !isUserTimesDisplayed) {
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
              const { result } = response;
              const { summary, items } = result;
              const profile = summary.slice(0, summary.indexOf("@"));
              setGcalProfile(profile);
              displayEvents(items);
            });
          });
      });
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

  console.log(selectedEventObjects, "selectedEvent Ids");

  return (
    <div className="App">
      {isModalShowing && (
        <Modal
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

const Modal = ({
  selectedEventId,
  setIsModalShowing,
  setSelectedEventId,
  selectedEventObjects,
  setSelectedEventObjects,
}) => {
  const event = selectedEventObjects.find(
    (event) => event.id === selectedEventId
  );
  const { start, end, title } = event;

  //start and end

  const removeEvent = () => {
    const index = selectedEventObjects
      .map((obj) => obj.id)
      .indexOf(selectedEventId);
    const reducedArr = [...selectedEventObjects];
    reducedArr.splice(index, 1);
    setSelectedEventObjects(reducedArr);
    setIsModalShowing(false);
    setSelectedEventId(null);
  };

  const [startTime, setStartTime] = useState(convertToTimeInput(start));
  const [endTime, setEndTime] = useState(convertToTimeInput(end));

  const handleSubmit = (e) => {
    e.preventDefault();
    const startHours = startTime.slice(0, startTime.indexOf(":"));
    const startMinutes = startTime.slice(startTime.indexOf(":") + 1);
    const StartTime = set(start, {
      hours: startHours,
      minutes: startMinutes,
    });
    event.start = StartTime;
    setIsModalShowing(false);
    setSelectedEventId(null);

    const endHours = endTime.slice(0, endTime.indexOf(":"));
    const endMinutes = endTime.slice(endTime.indexOf(":") + 1);
    const EndTime = set(end, {
      hours: endHours,
      minutes: endMinutes,
    });
    event.end = EndTime;
  };

  return (
    <div className="modal cal-modal modalDialog">
      <div className="modal-content center p-20 w-80">
        <div>
          <span
            className="close"
            onClick={() => {
              setIsModalShowing(false);
              setSelectedEventId(null);
            }}
          >
            &times;
          </span>
          <h3>{title}</h3>
          {/* <h4>{start.toLocaleString()}</h4>
          <h4>{end.toLocaleString()}</h4> */}
          <h4>
            Event hours {formatLocal(start)} to {formatLocal(end)}
          </h4>

          <form onSubmit={handleSubmit}>
            <div>
              <label for="appt-start-time">Edit start time : </label>
              <input
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                id="appt-start-time"
                type="time"
                name="appt-start-time"
                min={convertToTimeInput(start)}
                max="18:00"
              />
              <span class="validity"></span>
            </div>
            <div>
              <label for="appt-end-time">Edit end time : </label>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                id="appt-end-time"
                type="time"
                name="appt-end-time"
                min="12:00"
                max="18:00"
              />
              <span class="validity"></span>
            </div>
            <input value="save changes" type="submit" />
          </form>

          <button onClick={removeEvent}>Remove Event</button>
        </div>
      </div>
    </div>
  );
};

export default BigCalendar;
