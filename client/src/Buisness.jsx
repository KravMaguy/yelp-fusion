const Buisness = ({ data, name }) => {
  const buisness = data.find((buisness) => buisness.name === name);
  const { phone, rating, image_url } = buisness || "";
  return (
    <div>
      <img src={image_url} alt={name} style={{ width: "300px" }} />
      <ul style={{ listStyleType: "none" }}>
        <li>{rating}⭐</li>
        <li>{name}</li>
        <li>{phone}</li>
      </ul>
    </div>
  );
};

export default Buisness;
