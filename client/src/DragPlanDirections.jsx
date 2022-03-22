import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaWalking, FaBicycle, FaBus, FaCar } from "react-icons/fa";

import { IoIosBicycle, IoIosCar, IoIosBus, IoIosWalk } from "react-icons/io";

// a little function to help you with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  //   width: 250,
});

// dnd end

const DragPlanDirections = ({
  //   data,
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
}) => {
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

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

  console.log(currIdx, "currIdx");
  const travelModeStrings = {
    DRIVING: "Drive",
    BICYCLING: "Bike",
    WALKING: "Walk",
    TRANSIT: "Commute",
  };

  const resetForm = (e) => {
    e.preventDefault();
    const derivedData = data.map((x) => {
      return { id: x.id, name: x.name, coordinates: x.coordinates };
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

  return (
    <div className="col plan-col-right">
      <div className="plan-directions-container">
        <form class="bg-grey-plan-controls">
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

            <label for="TRANSIT">
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

            <label for="WALKING">
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
            class="pure-material-button-text"
          >
            Reset
          </button>
        </form>
        <div
          style={{
            color: currIdx === 0 ? "white" : "black",
            textShadow: currIdx === 0 ? "1px 1px 2px #000000" : "none",
          }}
          className="plan-card-shell align-left plan-top-card"
          onClick={() => viewFullPlan()}
        >
          <div className="plan-flex-container">
            <div className="mdc-card-wrapper__text-section">
              <div className="demo-card__title">
                <div
                  className={`numberCircle ${
                    currIdx === 0 ? "greyish-bg" : "red-bg"
                  } white-border`}
                >
                  {derivedData.length - 1}
                </div>
                <span class="text">Locations</span>
              </div>
              <div className="demo-card__subhead">
                {`${travelModeStrings[travelMode]} ${
                  distance && Math.round((distance / 1000 / 1.609) * 100) / 100
                }`}{" "}
                miles
              </div>
              <div className="demo-card__subhead">
                {time && humanDuration(time)}
              </div>
            </div>
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
                          className=""
                          onClick={() => handleSelectBox(idx + 1)}
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
                                currIdx === idx + 1
                                  ? "1px 1px 2px #000000"
                                  : "none",
                            }}
                            className="plan-card"
                          >
                            <div
                              className={
                                idx + 1 === currIdx
                                  ? "points-container"
                                  : "hidden"
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
                                  idx + 1 === currIdx ? "text top" : "hidden"
                                }
                              >
                                <p>
                                  {previous ? previous.name : "Your location"}
                                </p>
                              </div>
                              <div className="text">
                                <p>{location.name}</p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={
                              idx + 1 === currIdx ? "none mt-40" : "hidden"
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
