import { Link, useLocation } from "react-router-dom";

const Shift = ({ selectedDay, formatShift, hour, id }) => {
  return (
    <div className='cal-buisness-details'>
      <div>
        <Link to={`bigCalendar/${id}`}>Calendar</Link>
      </div>
      <div>
        {selectedDay
          .toLocaleDateString("en-US", {
            weekday: "long",
          })
          .slice(0, 2)}{" "}
        {formatShift(hour.start)}-{formatShift(hour.end)}
      </div>
    </div>
  );
};

export default Shift;
