const SpecialHours = ({
  special_hours,
  selectedDayHoliday,
  selectedDay,
  formatShift,
  id,
}) => {
  let specialHoursString = "";
  const SelectedDay = selectedDay
    .toLocaleDateString()
    .replace(/\b\d\b/g, "0$&");

  special_hours?.map((shift) => {
    const dateArr = shift.date.split("-");
    const first = dateArr.shift();
    dateArr.push(first);
    const myArr = dateArr.join("/");
    if (myArr === SelectedDay) {
      if (shift.is_closed) {
        specialHoursString += `Closed for ${
          selectedDayHoliday ? selectedDayHoliday.summary : "special hours"
        }`;
      } else {
        specialHoursString += `Open for ${
          selectedDayHoliday ? selectedDayHoliday.summary : "special hours"
        } ${formatShift(shift.start)}-${formatShift(shift.end)}`;
      }
    }
    return null;
  });

  return (
    <>
      <span
        key={id}
        className={specialHoursString.slice(0, 4) === "Open" ? "go" : "stop"}
      >
        {specialHoursString}
      </span>
    </>
  );
};

export default SpecialHours;
