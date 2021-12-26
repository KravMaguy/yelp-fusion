import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function Cal() {
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  console.log(selectedDay, "selectedDay");
  console.log(new Date(Date.now()).toLocaleDateString(), "local");
  const handleDayClick = (day, { selected }) => {
    setSelectedDay(day);
  };

  return (
    <div>
      <DayPicker selectedDays={selectedDay} onDayClick={handleDayClick} />
      <p>{selectedDay.toLocaleDateString()}</p>
    </div>
  );
}
export default Cal;
