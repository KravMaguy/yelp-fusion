import { useEffect, useState } from "react";
import axios from "axios";
import Cal from "./Cal";

const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`/buisnesses/${id}`);
  return data;
};

const Plan = (buisnesses) => {
  const [hours, setHours] = useState([]);

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

  return <Cal hours={hours} />;
};

export default Plan;
