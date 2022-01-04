import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import useMediaQuery from "./useMediaQuery";

function Cal({ hours }) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  console.log(isMobile, "is mobile");
  const [holidays, setHolidays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  // var today = new Date().getTime(); // 1501653935994
  // var from = new Date("02/08/2017").getTime(); // gives 1486492200000
  // var to = new Date("05/08/2017").getTime();

  // if(today >= from && today <= to) {
  //    // your code goes here
  // }
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
    <div className={!isMobile ? "plan-flex" : null}>
      <div className={!isMobile ? "plan-wrapper" : "left"}>
        <div style={{ margin: "16px" }}>
          <Link to={`/map`}>Link to map</Link>
        </div>
        <DayPicker
          selectedDays={selectedDay}
          onDayClick={handleDayClick}
          onMonthChange={(month) => {
            const today = new Date(Date.now());
            today.getMonth() !== month.getMonth()
              ? setSelectedDay(month)
              : setSelectedDay(today);
          }}
          disabledDays={[
            {
              before: new Date(Date.now()),
            },
          ]}
          month={new Date()}
          fromMonth={new Date()}
          toMonth={
            new Date(
              new Date().getFullYear + 10,
              new Date().getMonth(),
              new Date().getDate()
            )
          }
        />
      </div>
      <div className={`plan-wrapper left ${isMobile && "p-16"}`}>
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

                let specialHoursString = "";
                special_hours?.map((shift) => {
                  const dateArr = shift.date.split("-");
                  const first = dateArr.shift();
                  dateArr.push(first);
                  const myArr = dateArr.join("/");
                  if (myArr === SelectedDay) {
                    if (shift.is_closed) {
                      specialHoursString += `Closed for ${
                        selectedDayHoliday
                          ? selectedDayHoliday.summary
                          : "special hours"
                      }`;
                    } else {
                      specialHoursString += `Open for ${
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
                    <span
                      className={
                        specialHoursString.slice(0, 4) === "Open"
                          ? "go"
                          : "stop"
                      }
                    >
                      {specialHoursString}
                    </span>
                  </>
                );
              };
              console.log(selectedDay, "selectedDay");
              return (
                <>
                  <h4 className='buisness-cal-title' key={buisness.id}>
                    {buisness.name}
                  </h4>

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
