const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) {
    console.log("this shoudl trigger");
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <div className="tall-tester">
      <li>{place.name}</li>
    </div>
  );
};

export default PlaceDetails;
