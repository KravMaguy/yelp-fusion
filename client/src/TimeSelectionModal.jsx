import { useState } from "react";
import set from "date-fns/set";
import { convertToTimeInput } from "./utils";
const { addMinutes, subMinutes } = require("date-fns");

//logic
//appt-start
// min: event start
// max: {timelength} before appt-end
//appt-end
// min: {timelength} after appt-start
// max: event end

const TimeSelectionModal = ({
  data,
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
  const minShiftLength = 30;
  const [startTime, setStartTime] = useState(convertToTimeInput(start));
  const [endTime, setEndTime] = useState(convertToTimeInput(end));

  const startHours = startTime.slice(0, startTime.indexOf(":"));
  const startMinutes = startTime.slice(startTime.indexOf(":") + 1);
  const StartTime = new Date(
    set(start, {
      hours: startHours,
      minutes: startMinutes,
    })
  );

  const endHours = endTime.slice(0, endTime.indexOf(":"));
  const endMinutes = endTime.slice(endTime.indexOf(":") + 1);
  const EndTime = new Date(
    set(end, {
      hours: endHours,
      minutes: endMinutes,
    })
  );

  const originalEventObject = data.find((buisness) => buisness.name === title);
  const originalTimeSlot = originalEventObject.hours[0].open.find(
    (timeslot) => timeslot.id === selectedEventId
  );
  const originalStart = originalTimeSlot.start;
  const originalEnd = originalTimeSlot.end;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    event.start = StartTime;
    event.end = EndTime;
    setIsModalShowing(false);
    setSelectedEventId(null);
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
          <h4>
            Event hours {originalStart} to {originalEnd}
          </h4>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="appt-start-time">Edit start time : </label>
              <input
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
                id="appt-start-time"
                type="time"
                name="appt-start-time"
                min={convertToTimeInput(start)}
                max={convertToTimeInput(subMinutes(EndTime, minShiftLength))}
              />
              <span className="validity"></span>
            </div>
            <div>
              <label htmlFor="appt-end-time">Edit end time : </label>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                id="appt-end-time"
                type="time"
                name="appt-end-time"
                min={convertToTimeInput(addMinutes(StartTime, minShiftLength))}
                max={convertToTimeInput(end)}
              />
              <span className="validity"></span>
            </div>
            <input value="save changes" type="submit" />
          </form>

          <button onClick={removeEvent}>Remove Event</button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectionModal;
