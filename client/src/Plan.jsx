import { useEffect, useState } from "react";
import axios from "axios";
import Cal from "./Cal";

const fetchBuisnessData = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/buisnesses/${id}`);
  return data;
};

const Plan = ({ data, term, place }) => {
  const [BuisnessData, setBuisnessData] = useState([]);

  useEffect(() => {
    const Locations = data.map((location) => fetchBuisnessData(location.id));
    Promise.all(Locations)
      .then((BuisnessData) => {
        setBuisnessData(BuisnessData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  const savePlan = async () => {
    const someData = { selectedDay: "1/15/2022" };
    const { data } = await axios.post(
      `http://localhost:5000/saveplan/`,
      someData
    );
    return console.log(data, "data");
  };
  return (
    <>
      <h1 className='sub-header'>
        {term} plan in {place}
      </h1>
      <Cal BuisnessData={BuisnessData} term={term} />
      <button onClick={savePlan}>save</button>
    </>
  );
};

export default Plan;
