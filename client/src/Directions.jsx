import React, { useState, useEffect } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import Map from "./Map";
const data = [
  {
    id: "iu8lovu6epjFQl_JRVbjaw",
    alias: "tavern-on-the-point-chicago",
    name: "Tavern On The Point",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/nsKAAfOHg-un00Ke6u--iA/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/tavern-on-the-point-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 118,
    categories: [
      {
        alias: "cocktailbars",
        title: "Cocktail Bars",
      },
      {
        alias: "burgers",
        title: "Burgers",
      },
      {
        alias: "sandwiches",
        title: "Sandwiches",
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 42.00309,
      longitude: -87.81716,
    },
    transactions: ["pickup", "delivery"],
    location: {
      address1: "6724 N Northwest Hwy",
      address2: null,
      address3: "",
      city: "Chicago",
      zip_code: "60631",
      country: "US",
      state: "IL",
      display_address: ["6724 N Northwest Hwy", "Chicago, IL 60631"],
    },
    phone: "+17738676300",
    display_phone: "(773) 867-6300",
    distance: 1505.812033133233,
  },
  {
    id: "kwdwZBefst17lu4sK7IMdA",
    alias: "phoenix-flame-niles",
    name: "Phoenix Flame",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/hgFUcyc0eDjlOrcCpKco_Q/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/phoenix-flame-niles?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 55,
    categories: [
      {
        alias: "latin",
        title: "Latin American",
      },
      {
        alias: "mediterranean",
        title: "Mediterranean",
      },
      {
        alias: "sandwiches",
        title: "Sandwiches",
      },
    ],
    rating: 5,
    coordinates: {
      latitude: 42.026984,
      longitude: -87.802701,
    },
    transactions: ["pickup", "delivery"],
    price: "$$",
    location: {
      address1: "8010 N Waukegan Rd",
      address2: "",
      address3: null,
      city: "Niles",
      zip_code: "60714",
      country: "US",
      state: "IL",
      display_address: ["8010 N Waukegan Rd", "Niles, IL 60714"],
    },
    phone: "+18477793474",
    display_phone: "(847) 779-3474",
    distance: 1736.6368108340591,
  },
  {
    id: "Dv1kFZtLHM63xhWYQ_QFuw",
    alias: "pennyville-station-park-ridge",
    name: "Pennyville Station",
    image_url:
      "https://s3-media2.fl.yelpcdn.com/bphoto/H4tR_rOFC4SX6FKJmSUx-g/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/pennyville-station-park-ridge?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 120,
    categories: [
      {
        alias: "newamerican",
        title: "American (New)",
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 42.009553,
      longitude: -87.8317774,
    },
    transactions: ["pickup", "delivery"],
    location: {
      address1: "112 Main St",
      address2: "",
      address3: null,
      city: "Park Ridge",
      zip_code: "60068",
      country: "US",
      state: "IL",
      display_address: ["112 Main St", "Park Ridge, IL 60068"],
    },
    phone: "+18477204841",
    display_phone: "(847) 720-4841",
    distance: 2407.996316368517,
  },
  {
    id: "rUV1d6NhrT6wgYmAlJVk7g",
    alias: "the-garage-bar-and-sandwiches-chicago",
    name: "The Garage Bar & Sandwiches",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/NuQSeyl9G_BgVMGP4m9Q7Q/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/the-garage-bar-and-sandwiches-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 391,
    categories: [
      {
        alias: "pubs",
        title: "Pubs",
      },
      {
        alias: "sandwiches",
        title: "Sandwiches",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 41.99337,
      longitude: -87.78454,
    },
    transactions: ["pickup", "delivery"],
    price: "$$",
    location: {
      address1: "6154 N Milwaukee Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60646",
      country: "US",
      state: "IL",
      display_address: ["6154 N Milwaukee Ave", "Chicago, IL 60646"],
    },
    phone: "+17736471386",
    display_phone: "(773) 647-1386",
    distance: 2501.942745095162,
  },
  {
    id: "POD1z-P_d_TWrb8Ea9GMlw",
    alias: "daves-hot-chicken-chicago-2",
    name: "Dave's Hot Chicken",
    image_url:
      "https://s3-media2.fl.yelpcdn.com/bphoto/s3SJTVMUeUmS59vOSz9Qww/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/daves-hot-chicken-chicago-2?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 44,
    categories: [
      {
        alias: "chickenshop",
        title: "Chicken Shop",
      },
      {
        alias: "halal",
        title: "Halal",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 41.948044640543145,
      longitude: -87.68803620000001,
    },
    transactions: ["pickup", "delivery"],
    price: "$$",
    location: {
      address1: "3643 N Western Ave",
      address2: "",
      address3: null,
      city: "Chicago",
      zip_code: "60618",
      country: "US",
      state: "IL",
      display_address: ["3643 N Western Ave", "Chicago, IL 60618"],
    },
    phone: "+17737541555",
    display_phone: "(773) 754-1555",
    distance: 11809.51550024844,
  },
];

const Direction = ({ center }) => {
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [response, setResponse] = useState(null);
  const [path, setPath] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [routeColor, setRouteColor] = useState("#ff2343");

  useEffect(() => {
    setOrigin(center);
  }, [center]);

  useEffect(() => {
    if (data.length > 0) {
      const finalDestination = {
        lat: data[data.length - 1].coordinates.latitude,
        lng: data[data.length - 1].coordinates.longitude,
      };
      setDestination(finalDestination);
      // setCurrIdx(currIdx + 1);
    }
  }, [data]);

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
  const getWayPoints = () => {
    return data.slice(1, data.length - 1).map((destination) => {
      return {
        location: {
          lat: destination.coordinates.latitude,
          lng: destination.coordinates.longitude,
        },
        stopover: true,
      };
    });
  };

  return (
    <div className={"map-container"}>
      <button
        onClick={() =>
          routeColor === "#ff2343"
            ? setRouteColor("green")
            : setRouteColor("#ff2343")
        }
      >
        color
      </button>
      <main className={"map-wrapper"}>
        <Map center={origin}>
          {!response && !path && destination && origin && (
            <DirectionsService
              // required

              options={{
                destination: destination,
                origin: origin,
                waypoints: getWayPoints(),
                travelMode: "DRIVING",
              }}
              // required
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
              // required

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
