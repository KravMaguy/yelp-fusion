import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  IoIosBicycle,
  IoIosCar,
  IoIosBus,
  IoIosWalk,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { RiDragDropLine } from "react-icons/ri";

// a little function to help you with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

const DragPlanDirections = ({
  handleSelectBox,
  currIdx,
  response,
  setResponse,
  setOrigin,
  setDestination,
  setIdx,
  derivedData,
  setDerivedData,
  travelMode,
  setTravelMode,
  checkBicycling,
  checkWalking,
  checkTransit,
  checkDriving,
  data,
  center,
  collapsed,
  setCollapsed,
}) => {
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  console.log(data, "data");
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setIdx(0);

    const newItems = reorder(
      derivedData.slice(1),
      result.source.index,
      result.destination.index
    );
    setDerivedData([derivedData[0], ...newItems]);
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const destination = {
      lat: newItems[newItems.length - 1].coordinates.latitude,
      lng: newItems[newItems.length - 1].coordinates.longitude,
    };
    setOrigin(origin);
    setDestination(destination);
    setResponse(null);
  };

  useEffect(() => {
    if (!response) return;
    let totalDist = 0;
    let totalTime = 0;
    const myroute = response.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;
      totalTime += myroute.legs[i].duration.value;
    }
    setDistance(totalDist);
    setTime(totalTime);
  }, [response]);

  const viewFullPlan = () => {
    if (currIdx === 0) return;
    travelMode === "TRANSIT" && setTravelMode("DRIVING");

    setIdx(0);
    setResponse(null);
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    setOrigin(origin);
    setDestination(lastDestination);
  };

  function humanDuration(time) {
    return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
  }

  const travelModeStrings = {
    DRIVING: "Drive",
    BICYCLING: "Bike",
    WALKING: "Walk",
    TRANSIT: "Commute",
  };

  const resetForm = (e) => {
    e.preventDefault();
    const derivedData = data.map((x) => {
      return { id: x.id, name: x.name, coordinates: x.coordinates, url: x.url };
    });
    derivedData.unshift({
      name: "starting Location",
      coordinates: {
        id: "starting id",
        latitude: center.lat,
        longitude: center.lng,
      },
    });
    setDerivedData(derivedData);
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };

    setDestination(lastDestination);
    setOrigin(origin);
    setIdx(0);
    setResponse(null);
  };
  console.log({ collapsed });
  return (
    <div className="col plan-col-right">
      <div className="plan-directions-container">
        <div className="plan-inner-container">
          <form className="bg-grey-plan-controls">
            <div className="radio-wrapper">
              <label htmlFor="DRIVING">
                <input
                  type="radio"
                  name="DRIVING"
                  id="DRIVING"
                  className="driving"
                  checked={travelMode === "DRIVING"}
                  onChange={checkDriving}
                  value="DRIVING"
                />
                <IoIosCar />
              </label>

              <label htmlFor="BICYCLING">
                <input
                  type="radio"
                  name="BICYCLING"
                  className="bicycling"
                  id="BICYCLING"
                  checked={travelMode === "BICYCLING"}
                  onChange={checkBicycling}
                  value="BICYCLING"
                />
                <IoIosBicycle />
              </label>

              <label htmlFor="TRANSIT">
                <input
                  disabled={currIdx === 0}
                  type="radio"
                  name="TRANSIT"
                  className="transit"
                  id="TRANSIT"
                  checked={travelMode === "TRANSIT"}
                  onChange={checkTransit}
                  value="TRANSIT"
                />
                <IoIosBus />
              </label>

              <label htmlFor="WALKING">
                <input
                  type="radio"
                  name="WALKING"
                  className="walking"
                  id="WALKING"
                  checked={travelMode === "WALKING"}
                  onChange={checkWalking}
                  value="WALKING"
                />
                <IoIosWalk />
              </label>
            </div>
            <button
              onClick={(e) => resetForm(e)}
              className="no-link pure-material-button-text"
            >
              Reset
            </button>
          </form>
          <div
            style={{
              color: "white",
              textShadow: "1px 1px 2px #000000",
            }}
            className="plan-card-shell align-left plan-top-card"
            onClick={() => viewFullPlan()}
          >
            <div className="plan-flex-container">
              <div className="mdc-card-wrapper__text-section">
                <div className="demo-card__title">
                  <div
                    className={`numberCircle greyish-bg                 white-border`}
                  >
                    {derivedData.length - 1}
                  </div>
                  <span className="text font-big">Locations</span>
                </div>
                <div className="">
                  {`${travelModeStrings[travelMode]} ${
                    distance &&
                    Math.round((distance / 1000 / 1.609) * 100) / 100
                  }`}{" "}
                  miles
                </div>
                <div className="">{time && humanDuration(time)}</div>
              </div>
            </div>
          </div>
          <div className="dnd-text">
            <RiDragDropLine style={{ opacity: 0.9 }} />
            {`Drag and Drop`}
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {derivedData.slice(1).map((location, idx, arr) => {
                  let previous = arr[idx - 1];
                  return (
                    <Draggable
                      key={location.id}
                      draggableId={location.id}
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              color: currIdx === idx + 1 ? "white" : "black",
                              textShadow:
                                idx + 1 === currIdx
                                  ? "1px 1px 2px #000000"
                                  : "none",
                            }}
                            className="plan-card"
                          >
                            <div
                              className={
                                idx + 1 === currIdx && currIdx !== collapsed
                                  ? "points-container seconddiv coolclass"
                                  : "seconddiv hidden"
                              }
                            >
                              <div className="numberCircle">
                                {String.fromCharCode("A".charCodeAt(0) + idx)}
                              </div>
                              <div className="line"></div>
                              <div className="numberCircle">
                                {String.fromCharCode("B".charCodeAt(0) + idx)}
                              </div>
                            </div>
                            <div className="locations">
                              <div
                                className={
                                  idx + 1 === currIdx && currIdx !== collapsed
                                    ? "text top seconddiv coolclass"
                                    : "seconddiv"
                                }
                              >
                                <p>
                                  {previous ? previous.name : "Your location"}
                                </p>
                              </div>
                              <div
                                className="someclass"
                                style={{ display: "flex" }}
                              >
                                <div className="text">
                                  <p>
                                    {location.name}
                                    <br />
                                    {location?.location?.address1}
                                  </p>
                                </div>

                                {idx + 1 === currIdx &&
                                currIdx !== collapsed ? (
                                  <button
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: 0,
                                      background: "inherit",
                                      border: "0px",
                                    }}
                                    onClick={() => setCollapsed(idx + 1)}
                                  >
                                    <IoIosArrowDropupCircle
                                      style={{ fill: "#ddddddbf" }}
                                    />
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      position: "absolute",
                                      right: 0,
                                      top: 0,
                                      background: "inherit",
                                      border: "0px",
                                    }}
                                    onClick={() => handleSelectBox(idx + 1)}
                                  >
                                    <IoIosArrowDropdownCircle
                                      style={{ fill: "#ddddddbf" }}
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              idx + 1 === currIdx && collapsed !== currIdx
                                ? "mt-40"
                                : "hidden"
                            }
                            id={`panel-${idx + 1}`}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="fadedScroller_fade"></div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragPlanDirections;
