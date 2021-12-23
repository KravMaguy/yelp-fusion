import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const Buisness = ({ initialRequest }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const businessName = location.state.businessesName;
  const [buisnessData, setBuisnessData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(buisnessData, "buisness data");
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

  const { name, rating, is_closed, phone, price, photos, coordinates } =
    buisnessData || {};
  const { latitude, longitude } = coordinates || {};
  return (
    <div>
      <Link to={`/`}>Home</Link>
      {loading
        ? `loading ${businessName}`
        : buisnessData && (
            <div>
              <a
                rel='noreferrer'
                target='_blank'
                href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
              >
                Directions to {businessName}
              </a>

              <ul style={{ listStyleType: "none" }}>
                {<li>{name}</li>}
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
            </div>
          )}
    </div>
  );
};

export default Buisness;
