import axios from "axios";
import React, { useState, useEffect } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function Cal({ hours }) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [holidays, setHolidays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));

  const selectedDayHoliday = holidays.find((holidayEntry) => {
    const SelectedDay = selectedDay
      .toLocaleDateString()
      .replace(/\b\d\b/g, "0$&");
    const selectedArr = SelectedDay.split("/");
    const end = selectedArr.pop();
    selectedArr.unshift(end);
    if (
      selectedArr.join("-") === holidayEntry.start.date ||
      selectedArr.join("-") === holidayEntry.end.date
    ) {
      return true;
    }
    return false;
  });

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(day);
  };
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      )
      .then(({ data }) => setHolidays(data.items));
  }, []);

  return (
    <div className='plan-container'>
      <div className='plan-wrapper'>
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          disabledDays={[
            {
              before: new Date(Date.now()),
            },
          ]}
        />
      </div>
      <div className='plan-wrapper left'>
        <h2 className='date-title'>{selectedDay.toLocaleDateString()}</h2>
        {selectedDayHoliday ? (
          <span className='holiday-date-title'>
            {selectedDayHoliday.summary}
          </span>
        ) : null}
        {hours.length ? (
          hours.map((buisness) => {
            const openHours = buisness.hours[0].open;
            if (
              openHours.find(
                (shift) =>
                  weekDays[shift.day] ===
                  selectedDay.toLocaleDateString("en-US", { weekday: "long" })
              )
            ) {
              const formatShift = (shift) => {
                const myShift = shift.split("");
                myShift.splice(2, 0, ":");
                return myShift.join("");
              };
              const SpecialHours = ({ special_hours }) => {
                const SelectedDay = selectedDay
                  .toLocaleDateString()
                  .replace(/\b\d\b/g, "0$&");

                let string = "";
                special_hours?.map((shift) => {
                  const dateArr = shift.date.split("-");
                  const first = dateArr.shift();
                  dateArr.push(first);
                  const myArr = dateArr.join("/");
                  if (myArr === SelectedDay) {
                    if (shift.is_closed) {
                      string += `Closed for ${
                        selectedDayHoliday
                          ? selectedDayHoliday.summary
                          : "special hours"
                      }`;
                    } else {
                      string += `Open for ${
                        selectedDayHoliday
                          ? selectedDayHoliday.summary
                          : "special hours"
                      } ${formatShift(shift.start)}-${formatShift(shift.end)}`;
                    }
                  }
                  return null;
                });
                return (
                  <>
                    <br />
                    <span className={selectedDayHoliday ? "go" : "stop"}>
                      {string}
                    </span>
                  </>
                );
              };

              return (
                <>
                  <h4 key={buisness.id}>{buisness.name}</h4>
                  <div style={{ listStyleType: "none" }}>
                    {buisness.hours[0].open.map((hour, idx) => {
                      if (
                        weekDays[hour.day] ===
                        selectedDay.toLocaleDateString("en-US", {
                          weekday: "long",
                        })
                      ) {
                        return (
                          <div>
                            <span>
                              {selectedDay
                                .toLocaleDateString("en-US", {
                                  weekday: "long",
                                })
                                .slice(0, 2)}{" "}
                              {formatShift(hour.start)}-{formatShift(hour.end)}
                            </span>
                            <SpecialHours
                              special_hours={buisness.special_hours}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              );
            }
            return null;
          })
        ) : (
          <div>
            <p>Loading hours for plan</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cal;
