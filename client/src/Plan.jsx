import { useEffect, useState } from "react";
import axios from "axios";
import Cal from "./Cal";
import { weekDays } from "./utils";
const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/buisnesses/${id}`);
  return data;
};

const Plan = ({ data, term, place, user, setBuisnessData, BuisnessData }) => {
  const [selectedDay, setSelectedDay] = useState(new Date(Date.now()));
  useEffect(() => {
    const Locations = data.map((location) => fetchBuisnessData(location.id));
    Promise.all(Locations)
      .then((BuisnessData) => {
        setBuisnessData(BuisnessData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, setBuisnessData]);

  const formatShift = (shift) => {
    const myShift = shift.split("");
    myShift.splice(2, 0, ":");
    return myShift.join("");
  };

  const savePlan = async () => {
    const { id } = user;
    const req = {
      date: selectedDay,
      userId: id,
      term,
      location: place,
      timeBlocks: [],
    };
    BuisnessData.map((buisness) => {
      const { name } = buisness;
      return buisness.hours[0].open.map((hour) => {
        if (
          weekDays[hour.day] ===
          selectedDay.toLocaleDateString("en-US", {
            weekday: "long",
          })
        ) {
          const { timeBlocks } = req;
          timeBlocks.push({ ...hour, name });
        }
        return null;
      });
    });
    const { data } = await axios.post(`http://localhost:5000/saveplan/`, req);
    return console.log(data, "data");
  };

  return (
    <>
      <h1 className='sub-header'>
        {term} plan in {place}
      </h1>
      <Cal
        BuisnessData={BuisnessData}
        term={term}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        formatShift={formatShift}
      />
      {user && (
        <button
          style={{
            width: "100%",
            background: "lightsteelblue",
            height: "10vh",
            fontSize: "xx-large",
          }}
          onClick={savePlan}
        >
          save
        </button>
      )}
    </>
  );
};

export default Plan;

// {BuisnessData.map((buisness) => {
//   const openHours = buisness.hours[0].open;
//   if (
//     openHours.find(
//       (shift) =>
//         weekDays[shift.day] ===
//         selectedDay.toLocaleDateString("en-US", { weekday: "long" })
//     )
//   ) {
//     return (

//         <div style={{ listStyleType: "none" }}>
//           {buisness.hours[0].open.map((hour, idx) => {
//             if (
//               weekDays[hour.day] ===
//               selectedDay.toLocaleDateString("en-US", {
//                 weekday: "long",
//               })
//             ) {
//               return (
//                 <div key={idx}>
//                   <Shift
//                     selectedDay={selectedDay}
//                     formatShift={formatShift}
//                     hour={hour}
//                   />
//                   <SpecialHours
//                     special_hours={buisness.special_hours}
//                     selectedDay={selectedDay}
//                     selectedDayHoliday={selectedDayHoliday}
//                     formatShift={formatShift}
//                     id={id}
//                   />
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>
//       </div>
//     );
//   }
//   return null;
// })}
