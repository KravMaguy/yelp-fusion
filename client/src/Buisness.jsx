import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Buisness = ({ initialRequest }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const businessName = location.state.businessesName;
  const [buisnessData, setBuisnessData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!initialRequest) {
      return navigate("/");
    }
    const fetchBuisness = async () => {
      const { data } = await axios.get(`/buisnesses/${id}`);
      setBuisnessData(data);
      setLoading(false);
    };
    fetchBuisness();
  }, [id, initialRequest, navigate]);

  const { name, rating, is_closed, phone, price, photos } = buisnessData || {};

  return (
    <div>
      {loading
        ? `loading ${businessName}`
        : buisnessData && (
            <>
              <h1>{name}</h1>
              <ul style={{ listStyleType: "none" }}>
                {<li>{rating}⭐</li>}
                {<li>closed now: {is_closed.toString()}</li>}
                {<li>{phone}</li>}
                {<li>{price}</li>}
                <div className='gallery'>
                  {photos.map((photo) => (
                    <img
                      key={photo}
                      className='gallery__img'
                      src={photo}
                      alt={photo}
                      width='300px'
                    />
                  ))}
                </div>
              </ul>
            </>
          )}
    </div>
  );
};

export default Buisness;
