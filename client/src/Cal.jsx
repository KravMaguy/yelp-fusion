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
    <div className='plan-container'>
      <div className='plan-wrapper'>
        <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
      </div>
      <div className='plan-wrapper left'>
        <h2 className='date-title'>{selectedDay.toLocaleDateString()}</h2>

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
              return (
                <>
                  <h4 key={buisness.id}>{buisness.name}</h4>
                  <div style={{ listStyleType: "none" }}>
                    {buisness.hours[0].open.map((hour, idx) => {
                      // const shiftm = hour.start.split("");
                      // shiftm.splice(2, 0, ":");
                      // console.log(shiftm.join(""), "m shift");
                      if (
                        weekDays[hour.day] ===
                        selectedDay.toLocaleDateString("en-US", {
                          weekday: "long",
                        })
                      ) {
                        return (
                          <span key={idx}>
                            {selectedDay
                              .toLocaleDateString("en-US", {
                                weekday: "long",
                              })
                              .slice(0, 2)}{" "}
                            {formatShift(hour.start)}-{formatShift(hour.end)}
                          </span>
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
