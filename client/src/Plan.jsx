import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";

const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`/buisnesses/${id}`);
  return data;
};

const Plan = (buisnesses) => {
  const [hours, setHours] = useState([]);
  const days = [
    { day: "monday", start_times: [], end_times: [] },
    { day: "tuesday", start_times: [], end_times: [] },
    { day: "wednesday", start_times: [], end_times: [] },
    { day: "thursday", start_times: [], end_times: [] },
    { day: "friday", start_times: [], end_times: [] },
    { day: "saturday", start_times: [], end_times: [] },
    { day: "sunday", start_times: [], end_times: [] },
  ];

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
      {hours.length ? (
        hours.map((buisness) => {
          console.log(buisness.name, " the biz");
          console.log(buisness.hours[0], " hours");
          console.log("************************************");
          return (
            <>
              <h2 key={buisness.id}>{buisness.name}</h2>
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
      )}
    </div>
  );
};

export default Plan;
