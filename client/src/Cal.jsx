import React, { useState } from "react";
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

  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  const handleDayClick = (day, { selected }) => {
    setSelectedDay(day);
  };

  return (
    <div>
      <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
      <p>{selectedDay.toLocaleDateString("en-US", { weekday: "long" })}</p>
      <p>{selectedDay.toLocaleDateString()}</p>
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
            return (
              <>
                <p key={buisness.id}>{buisness.name}</p>
                <ul style={{ listStyleType: "none" }}>
                  {buisness.hours[0].open.map((hour, idx) => {
                    if (
                      weekDays[hour.day] ===
                      selectedDay.toLocaleDateString("en-US", {
                        weekday: "long",
                      })
                    ) {
                      return (
                        <li key={idx}>
                          {hour.start}-{hour.end}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
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
  );
}
export default Cal;
