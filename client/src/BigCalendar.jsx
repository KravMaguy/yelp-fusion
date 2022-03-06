import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  weekDays,
  restaurantObjects,
  events,
  getNextDayOfTheWeek,
  localizer,
  gapiConfig,
} from "./utils";
import { Link, useParams, useNavigate } from "react-router-dom";

function BigCalendar({ BuisnessData: data, user }) {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  console.log(allEvents, "allEvetns");
  const [name, setName] = useState("");
  const [userTimes, setUserTimes] = useState([]);
  const [isUserTimesDisplayed, setIsUserTimesDisplayed] = useState(false);
  const params = useParams();
  const { id } = params;
  const mockBuisnessData = true;
  if (mockBuisnessData) {
    data = restaurantObjects;
  }

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  useEffect(() => {
    const calendarObject = data.find((element) => element.id === id);
    if (!calendarObject) return;
    const { name, hours, is_claimed } = calendarObject;
    setName(name);
    if (!hours || !is_claimed) return;
    let lastId = events[events.length - 1].id + 1;
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
        id: lastId++,
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
    let lastId = allEvents[allEvents.length - 1].id + 1;
    const userCaltimes = events.map((event) => {
      return {
        id: lastId++,
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
            gapi.client.calendar.events
              .list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
              })
              .then((response) => {
                const events = response.result.items;
                displayEvents(events);
              });
          });
      });
    }
    setIsUserTimesDisplayed(true);
  };

  const hideTimes = () => {
    setIsUserTimesDisplayed(false);
  };

  return (
    <div className="App">
      <h1>Calendar</h1>
      <select onChange={handleSelectCal}>
        {data.length > 0 ? (
          data.map((option) => (
            <option
              selected={option.id === id}
              key={option.id}
              value={option.id}
            >
              {option.id}
            </option>
          ))
        ) : (
          <option value="Loading...">
            Getting buisness data please wait...
          </option>
        )}
      </select>
      <h2>
        {allEvents.length === events.length
          ? name + " has no listed times"
          : name}
      </h2>
      <Link to={"/"}>back</Link>
      <div>
        <button onClick={!isUserTimesDisplayed ? displayTimes : hideTimes}>
          {!isUserTimesDisplayed ? "Display" : "Hide"} my times
        </button>
      </div>
      {user && (
        <>
          <input
            type="text"
            placeholder="Add Title"
            style={{ width: "20%", marginRight: "10px" }}
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DayPickerInput
            value={newEvent.start}
            onDayChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <DayPickerInput
            value={newEvent.end}
            onDayChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
            Add Event
          </button>
        </>
      )}

      <Calendar
        localizer={localizer}
        events={
          isUserTimesDisplayed ? [...allEvents].concat(...userTimes) : allEvents
        }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default BigCalendar;
