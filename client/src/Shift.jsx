const Shift = ({ selectedDay, formatShift, hour }) => {
  return (
    <span>
      {selectedDay
        .toLocaleDateString("en-US", {
          weekday: "long",
        })
        .slice(0, 2)}{" "}
      {formatShift(hour.start)}-{formatShift(hour.end)}
    </span>
  );
};

export default Shift;
