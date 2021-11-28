import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Buisness = ({ data }) => {
  let navigate = useNavigate();
  const [buisnessData, setBuisnessData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const buisness = data.find((Buisness) => Buisness.id === id);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (data.length < 1) {
      source.cancel();
      return navigate("/");
    }
    const fetchBuisness = async () => {
      const { data } = await axios.get(`/buisnesses/${id}`);
      setBuisnessData(data);
      setLoading(false);
    };
    fetchBuisness();
  }, [id, data.length, navigate]);

  return (
    <div>
      {loading ? (
        `fetching info ${buisness?.name} `
      ) : (
        <>
          <h1>{buisness.name}</h1>
          <ul style={{ listStyleType: "none" }}>
            {buisnessData?.rating && <li>{buisnessData.rating}⭐</li>}
            {<li>closed now: {buisnessData.is_closed.toString()}</li>}
            {buisnessData?.phone && <li>{buisnessData.phone}</li>}
            {buisnessData?.price && <li>{buisnessData.price}</li>}
          </ul>
          {buisnessData?.photos ? (
            <div class='gallery'>
              {buisnessData.photos.map((photo) => (
                <img
                  className='gallery__img'
                  src={photo}
                  alt={photo}
                  width='300px'
                />
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Buisness;
