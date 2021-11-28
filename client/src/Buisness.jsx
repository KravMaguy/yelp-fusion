// name={pathname.slice(1).replace(/%20/g, " ")}
import { useParams } from "react-router";
const Buisness = ({ data, name }) => {
  const { id } = useParams();
  const buisness = data.find((buisness) => buisness.id === id);
  console.log(buisness);
  // const { phone, rating, image_url } = buisness || "";
  return (
    <div>
      {/* <img src={image_url} alt={name} style={{ width: "300px" }} />
      <ul style={{ listStyleType: "none" }}>
        <li>{rating}⭐</li>
        <li>{name}</li>
        <li>{phone}</li>
      </ul> */}
      I will be the buisness component
    </div>
  );
};

export default Buisness;
