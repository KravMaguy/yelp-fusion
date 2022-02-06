import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import useMediaQuery from "./useMediaQuery";
import DailyPlan from "./DailyPlan.jsx";

function Cal({ BuisnessData }) {
  const isMobile = useMediaQuery("(max-width: 560px)");
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
        {BuisnessData.length ? (
          <>
            <DailyPlan
              BuisnessData={BuisnessData}
              selectedDay={selectedDay}
              selectedDayHoliday={selectedDayHoliday}
            />
          </>
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
