import { useEffect } from "react";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.token}`;

const GetComponent = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:5000/events`);

      console.log(data);
    };
    getData();

    console.log("effect");
  }, []);
  return <>I will get the events</>;
};

export default GetComponent;
