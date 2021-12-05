import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Buisness = ({ initialRequest }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const businessName = location.state.businessName;

  const [buisnessData, setBuisnessData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (!initialRequest) {
      source.cancel();
      return navigate("/");
    }
    const fetchBuisness = async () => {
      const { data } = await axios.get(`/buisnesses/${id}`);
      setBuisnessData(data);
      setLoading(false);
    };
    fetchBuisness();
  }, [id, initialRequest, navigate]);

  return (
    <div>
      {loading ? (
        businessName
      ) : (
        <>
          <h1>{buisnessData.name}</h1>
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
