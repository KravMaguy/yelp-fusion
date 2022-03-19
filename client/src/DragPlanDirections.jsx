import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// dnd init

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

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
  data,
  handleSelectBox,
  currIdx,
  response,
  setResponse,
  setOrigin,
  setDestination,
  setIdx,
  derivedData,
  travelMode,
  setTravelMode,
  checkBicycling,
  checkWalking,
  checkTransit,
  checkDriving,
}) => {
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  //   dnd start

  const [items, setItems] = useState(getItems(10));

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    // console.log("New items : ", newItems);

    setItems(newItems);
  };

  //   dnd end

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

  return (
    <div className="col plan-col-right">
      <div className="plan-directions-container">
        <div className="plan-card-shell align-left">
          <div class="parent">
            <div className="child">
              <input
                id="DRIVING"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "DRIVING"}
                onChange={checkDriving}
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>
            <div className="child">
              <input
                id="BICYCLING"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "BICYCLING"}
                onChange={checkBicycling}
              />
              <label className="" htmlFor="BICYCLING">
                Bicycling
              </label>
            </div>
            <div className="child">
              <input
                disabled={currIdx === 0}
                id="TRANSIT"
                className=""
                name="travelMode"
                type="radio"
                checked={travelMode === "TRANSIT"}
                onChange={checkTransit}
              />
              <label className="custom-control-label" htmlFor="TRANSIT">
                Transit
              </label>
            </div>
            <div className="child">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={travelMode === "WALKING"}
                onChange={checkWalking}
              />
              <label className="" htmlFor="WALKING">
                Walking
              </label>
            </div>
          </div>
        </div>
        <div
          className="plan-card-shell align-left plan-top-card"
          onClick={() => viewFullPlan()}
        >
          <div className="plan-flex-container">
            <div className="mdc-card-wrapper__text-section">
              <div className="demo-card__title">
                <div className="numberCircle red-color white-border">
                  {data.length}
                </div>
                <span class="text">Destinations</span>
              </div>
              <div className="demo-card__subhead">
                {distance && Math.round((distance / 1000 / 1.609) * 100) / 100}
                mi
              </div>
              <div className="demo-card__subhead">
                {time && humanDuration(time)}
              </div>
            </div>
          </div>
        </div>
        ----start
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {/* {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          onClick={() => console.log("was clicked")}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  );
                })} */}

                {data.map((location, idx, arr) => {
                  let previous = arr[idx - 1];
                  return (
                    <Draggable
                      key={location.id}
                      draggableId={location.id}
                      index={idx}
                    >
                      {(provided, snapshot) => (
                        <div
                          onClick={() => handleSelectBox(idx + 1)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="card">
                            <div className="points-container">
                              <div className="numberCircle">
                                {String.fromCharCode("A".charCodeAt(0) + idx)}
                              </div>
                              <div className="line"></div>
                              <div className="numberCircle">
                                {String.fromCharCode("B".charCodeAt(0) + idx)}
                              </div>
                            </div>
                            <div className="locations">
                              <div className="text top">
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
                          />{" "}
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        -------end
      </div>
      <div className="fadedScroller_fade"></div>
    </div>
  );
};

export default DragPlanDirections;
