import React, { useState, useEffect } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import Map from "./Map";
const data = [
  {
    id: "h98ZbeAb8QO2wZ-dPMO6iw",
    alias: "ekf-martial-arts-chicago-2",
    name: "EKF Martial Arts",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/0ndV4m2JDqw6e33KNzNgCA/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/ekf-martial-arts-chicago-2?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 27,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
      {
        alias: "boxing",
        title: "Boxing",
      },
      {
        alias: "taichi",
        title: "Tai Chi",
      },
    ],
    rating: 5,
    coordinates: {
      latitude: 41.9901150128242,
      longitude: -87.6696621693116,
    },
    transactions: [],
    location: {
      address1: "5951 N Clark St",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60660",
      country: "US",
      state: "IL",
      display_address: ["5951 N Clark St", "Chicago, IL 60660"],
    },
    phone: "+17737196488",
    display_phone: "(773) 719-6488",
    distance: 3658.2790081952644,
  },
  {
    id: "aGCUksjACc8-AYhpz_F7QA",
    alias: "ultimate-martial-arts-lincolnwood",
    name: "Ultimate Martial Arts",
    image_url:
      "https://s3-media2.fl.yelpcdn.com/bphoto/oR9SeKioxjdvPd5iO1Yj4A/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/ultimate-martial-arts-lincolnwood?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 52,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 42.0118849,
      longitude: -87.7271591,
    },
    transactions: [],
    location: {
      address1: "3922 W Touhy Ave",
      address2: "",
      address3: "",
      city: "Lincolnwood",
      zip_code: "60712",
      country: "US",
      state: "IL",
      display_address: ["3922 W Touhy Ave", "Lincolnwood, IL 60712"],
    },
    phone: "+18476793330",
    display_phone: "(847) 679-3330",
    distance: 1689.1069758230785,
  },
  {
    id: "8JPoLXa-9BKrim-7D-1jaQ",
    alias: "redzovic-jiu-jitsu-lincoln-square-chicago",
    name: "Redzovic Jiu Jitsu - Lincoln Square",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/zeC3G3U3mQiX0cy1Dfs_pQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/redzovic-jiu-jitsu-lincoln-square-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 27,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 41.9709525257349,
      longitude: -87.6901070773602,
    },
    transactions: [],
    location: {
      address1: "4900 N Lincoln Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60625",
      country: "US",
      state: "IL",
      display_address: ["4900 N Lincoln Ave", "Chicago, IL 60625"],
    },
    phone: "+17733345189",
    display_phone: "(773) 334-5189",
    distance: 4158.91942816934,
  },
];
data.map((x, idx) => console.log(idx, x.name, x.coordinates));
const Direction = () => {
  const center = { lat: 42.0055069, lng: -87.7114431 };

  const initialDestination = 0;
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(center);
  const [response, setResponse] = useState(null);
  const [path, setPath] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [routeColor, setRouteColor] = useState("#ff2343");
  const [currIdx, setIdx] = useState(initialDestination);

  useEffect(() => {
    if (data.length > 0) {
      const nextDestination = {
        lat: data[initialDestination].coordinates.latitude,
        lng: data[initialDestination].coordinates.longitude,
      };
      setDestination(nextDestination);
    }
  }, []);

  const pathOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };
  // const getWayPoints = () => {
  //   return data.slice(1, data.length - 1).map((destination) => {
  //     return {
  //       location: {
  //         lat: destination.coordinates.latitude,
  //         lng: destination.coordinates.longitude,
  //       },
  //       stopover: true,
  //     };
  //   });
  // };

  const nextDestination = () => {
    // routeColor === "#ff2343"
    //   ? setRouteColor("green")
    //   : setRouteColor("#ff2343");

    setOrigin(destination);
    const nextIdx = currIdx + 1;
    const nextDestination = {
      lat: data[nextIdx].coordinates.latitude,
      lng: data[nextIdx].coordinates.longitude,
    };
    setDestination(nextDestination);
    setResponse(null);
    setIdx(nextIdx);
  };

  const prevDestination = () => {
    const prevIdx = currIdx - 1;
    if (currIdx === 1) {
      setOrigin(center);
      setDestination(origin);
    } else {
      setDestination(origin);
      const prevDestination = {
        lat: data[prevIdx - 1].coordinates.latitude,
        lng: data[prevIdx - 1].coordinates.longitude,
      };
      setOrigin(prevDestination);
    }
    setResponse(null);
    setIdx(prevIdx);
  };

  return (
    <div className={"map-container"}>
      <main className={"map-wrapper"}>
        <div className='map-card-controls'>
          <button
            className='map-controls'
            style={
              currIdx <= 0
                ? {
                    color: "dimgrey",
                    background: "#6969695c",
                  }
                : null
            }
            disabled={currIdx <= 0 ? true : false}
            onClick={() => prevDestination()}
          >
            Prev
          </button>
          <button
            style={
              currIdx >= data.length - 1
                ? {
                    color: "dimgrey",
                    background: "#6969695c",
                  }
                : null
            }
            className='map-controls'
            disabled={currIdx >= data.length - 1 ? true : false}
            onClick={() => nextDestination()}
          >
            Next
          </button>
        </div>
        <Map center={origin}>
          {!response && !path && destination && origin && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                // waypoints: getWayPoints(),
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                console.log(response);
                if (response !== null) {
                  if (response.status === "OK") {
                    console.log("response =", response);
                    setResponse(response);
                  } else {
                    console.log("response: ", response);
                    console.log(origin, "org");
                    console.log(destination, "dest");
                    setPath([origin, destination]);
                    setZoom(3);
                  }
                }
              }}
            />
          )}

          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
                polylineOptions: { strokeColor: routeColor },
              }}
            />
          )}

          {path && (
            <Polyline
              onLoad={() => console.log("drawing polyline")}
              path={path}
              options={pathOptions}
            />
          )}
        </Map>
      </main>
    </div>
  );
};

export default Direction;
