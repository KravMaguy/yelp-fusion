import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import Cal from "./Cal";

const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`/buisnesses/${id}`);
  return data;
};

// function getDayName(dateStr, locale) {
//   var date = new Date(dateStr);
//   return date.toLocaleDateString(locale, { weekday: "long" });
// }

// const dateStr = "05/23/2014";
// const day = getDayName(dateStr, "en-US");

const Plan = (buisnesses) => {
  const [hours, setHours] = useState([]);
  //   const days = [
  //     { day: "Monday", start_times: [], end_times: [] },
  //     { day: "Tuesday", start_times: [], end_times: [] },
  //     { day: "Wednesday", start_times: [], end_times: [] },
  //     { day: "Thursday", start_times: [], end_times: [] },
  //     { day: "Friday", start_times: [], end_times: [] },
  //     { day: "Saturday", start_times: [], end_times: [] },
  //     { day: "Sunday", start_times: [], end_times: [] },
  //   ];

  useEffect(() => {
    const Locations = buisnesses.data.map((location) =>
      fetchBuisnessData(location.id)
    );
    Promise.all(Locations)
      .then((hours) => {
        setHours(hours);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [buisnesses.data]);

  return (
    <div>
      {/*{hours.length ? (
        hours.map((buisness) => {
          console.log(buisness.name, " the biz");
          console.log(buisness.hours[0], " hours");
          console.log("************************************");
          return (
            <>
               <h2 key={buisness.id}>{buisness.name}</h2>
              <Cal />
              <ul>
                {buisness.hours[0].open.map((hour, idx) => (
                  <li key={idx}>
                    {days[hour.day].day} - {hour.start}-{hour.end}
                  </li>
                ))}
              </ul>
            </>
          );
        })
      ) : (
        <div>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Loading hours for plan</p>
        </div>
      )} */}

      <Cal hours={hours} />
    </div>
  );
};

export default Plan;
