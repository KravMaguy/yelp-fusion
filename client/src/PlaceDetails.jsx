import Icon from "./Icon";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) {
    console.log("this shoudl trigger");
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    // <div className="tall-tester">
    //   <li>{place.name}</li>
    // </div>
    <div className="container">
      <div className="example">
        <article className="card depth--two">
          <header className="card__primary-title">
            <figure className="image image--avatar">
              {/* <img src={YelpLogo} alt="Cat" /> */}
              <Icon />
            </figure>
            <div className="item item--two-lines">
              <h2 className="text-medium text-bold">something</h2>
              <h3 className="text-secondary text-normal text-small">
                {place.name}
              </h3>
            </div>
          </header>
          <figure className="image">
            <img src={place.img} alt="Food" />
          </figure>
          <div className="card__body">
            <div className="card__supporting-text">
              Supporting text. Lorem ipsum dolor sit amet.
            </div>
          </div>
          <footer className="card__actions">
            <a className="btn btn--icon" href="#">
              <i className="material-icons">favorite_border</i>
            </a>
            <a className="btn btn--icon" href="#">
              <i className="material-icons">share</i>
            </a>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default PlaceDetails;
