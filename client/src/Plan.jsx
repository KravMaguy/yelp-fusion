import { useEffect, useState } from "react";
import axios from "axios";
import Cal from "./Cal";

const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`/buisnesses/${id}`);
  return data;
};

const Plan = ({ data, term, place }) => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const Locations = data.map((location) => fetchBuisnessData(location.id));
    Promise.all(Locations)
      .then((hours) => {
        setHours(hours);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <>
      <h1 className='sub-header'>
        {term} plan in {place}
      </h1>
      <Cal hours={hours} term={term} />
    </>
  );
};

export default Plan;
