import SpecialHours from "./SpecialHours";
import Shift from "./Shift";
import { weekDays } from "./utils.js";

const DailyPlan = ({
  BuisnessData,
  selectedDay,
  selectedDayHoliday,
  formatShift,
}) => {
  return (
    <>
      <ul>
        {BuisnessData.map((buisness) => {
          const openHours = buisness.hours[0].open;
          const { id } = buisness;
          if (
            openHours.find(
              (shift) =>
                weekDays[shift.day] ===
                selectedDay.toLocaleDateString("en-US", { weekday: "long" })
            )
          ) {
            return (
              <div key={id}>
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
                        <div key={idx}>
                          <Shift
                            selectedDay={selectedDay}
                            formatShift={formatShift}
                            hour={hour}
                          />
                          <SpecialHours
                            special_hours={buisness.special_hours}
                            selectedDay={selectedDay}
                            selectedDayHoliday={selectedDayHoliday}
                            formatShift={formatShift}
                            id={id}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

export default DailyPlan;
