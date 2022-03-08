import { dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const restaurantObjects = [
  {
    id: "9mhqcimD0CYvqxzfj_VXnQ",
    alias: "little-bad-wolf-chicago",
    name: "Little Bad Wolf",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/Cf_ZeAt323eQv83zdhxASA/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/little-bad-wolf-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17739426399",
    display_phone: "(773) 942-6399",
    review_count: 1748,
    categories: [
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
      {
        alias: "beerbar",
        title: "Beer Bar",
      },
      {
        alias: "cocktailbars",
        title: "Cocktail Bars",
      },
    ],
    rating: 4.5,
    location: {
      address1: "1541 W Bryn Mawr Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60660",
      country: "US",
      state: "IL",
      display_address: ["1541 W Bryn Mawr Ave", "Chicago, IL 60660"],
      cross_streets: "Ashland Ave & Clark St",
    },
    coordinates: {
      latitude: 41.983356,
      longitude: -87.669057,
    },
    photos: [
      "https://s3-media3.fl.yelpcdn.com/bphoto/Cf_ZeAt323eQv83zdhxASA/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/toArQxfxcRhOTenGCVMtAQ/o.jpg",
      "https://s3-media1.fl.yelpcdn.com/bphoto/Wsqimf33E95n3Jkr9pR_6g/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 0,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 1,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 3,
          },
          {
            is_overnight: true,
            start: "1100",
            end: "0100",
            day: 4,
          },
          {
            is_overnight: true,
            start: "1100",
            end: "0100",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery", "pickup"],
  },
  {
    id: "e9aAISx0navH8qMr33X4TA",
    alias: "mother-cluckers-kitchen-chicago-chicago",
    name: "Mother Cluckers Kitchen - Chicago",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/YOgwO43W8xy9wYEutkwudw/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/mother-cluckers-kitchen-chicago-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17736854630",
    display_phone: "(773) 685-4630",
    review_count: 886,
    categories: [
      {
        alias: "southern",
        title: "Southern",
      },
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
    ],
    rating: 4.5,
    location: {
      address1: "5200 N Elston Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60630",
      country: "US",
      state: "IL",
      display_address: ["5200 N Elston Ave", "Chicago, IL 60630"],
      cross_streets: "Laporte Ave & Foster Ave",
    },
    coordinates: {
      latitude: 41.9752685744915,
      longitude: -87.7522482539673,
    },
    photos: [
      "https://s3-media3.fl.yelpcdn.com/bphoto/YOgwO43W8xy9wYEutkwudw/o.jpg",
      "https://s3-media3.fl.yelpcdn.com/bphoto/m6sJUAlj18RH1xpunrrTTA/o.jpg",
      "https://s3-media1.fl.yelpcdn.com/bphoto/_rr95Pu5Ji6BxaUC1C391A/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 0,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 3,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 4,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery", "pickup"],
  },
  {
    id: "xA_jOrFrywsyht2-_8wU2w",
    alias: "land-and-lake-andersonville-chicago",
    name: "Land & Lake Andersonville",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/vEx4eUxDt2t3nvXOsc2n-w/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/land-and-lake-andersonville-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17737399072",
    display_phone: "(773) 739-9072",
    review_count: 34,
    categories: [
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
    ],
    rating: 4.5,
    location: {
      address1: "5420 N Clark St",
      address2: null,
      address3: "",
      city: "Chicago",
      zip_code: "60640",
      country: "US",
      state: "IL",
      display_address: ["5420 N Clark St", "Chicago, IL 60640"],
      cross_streets: "Rascher Ave & Balmoral Ave",
    },
    coordinates: {
      latitude: 41.980472,
      longitude: -87.66852,
    },
    photos: [
      "https://s3-media1.fl.yelpcdn.com/bphoto/vEx4eUxDt2t3nvXOsc2n-w/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/w9-cvQK5SjdlJ9JJMC-JPQ/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/kBVrY39BL_6A1uCbFPhNAA/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 1,
          },
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 3,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2200",
            day: 4,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2200",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery"],
  },
  {
    id: "ysMipfzNQQFweoLSpGJTaA",
    alias: "pho-le-777-chicago",
    name: "Pho Le 777",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/eYsb9LOD-4KhwDQB56rWsg/o.jpg",
    is_claimed: false,
    is_closed: false,
    url: "https://www.yelp.com/biz/pho-le-777-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "",
    display_phone: "",
    review_count: 1,
    categories: [
      {
        alias: "vietnamese",
        title: "Vietnamese",
      },
    ],
    rating: 5,
    location: {
      address1: "6257 N McCormick Blvd",
      address2: "",
      address3: null,
      city: "Chicago",
      zip_code: "60659",
      country: "US",
      state: "IL",
      display_address: ["6257 N McCormick Blvd", "Chicago, IL 60659"],
      cross_streets: "",
    },
    coordinates: {
      latitude: 41.99546514676066,
      longitude: -87.71261516958475,
    },
    photos: [
      "https://s3-media1.fl.yelpcdn.com/bphoto/eYsb9LOD-4KhwDQB56rWsg/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/Uj3jSbtR_CVc9R53tYkdyA/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/GPAjRL5_Pqrzt4ouL9oGkw/o.jpg",
    ],
    transactions: ["delivery", "pickup"],
  },
];

const now = new Date();

export const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2022, 3, 12, 17, 0, 0, 0),
    end: new Date(2022, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient multi-day Conference Call",
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 14, 1, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Halloween Meeting",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview yeah here",
    start: new Date(2022, 3, 14, 17, 0, 0),
    end: new Date(2022, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
];

export function getNextDayOfTheWeek(dayName, refDate = new Date()) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(refDate.getDate() + ((dayOfWeek + 7 - refDate.getDay()) % 7));
  return refDate;
}

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const gapiConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  clientId: process.env.REACT_APP_CLIENT_ID,
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
  scope: "https://www.googleapis.com/auth/calendar.events",
};

export const gcalConfig = {
  calendarId: "primary",
  timeMin: new Date().toISOString(),
  showDeleted: false,
  singleEvents: true,
  maxResults: 10,
  orderBy: "startTime",
};

export function utilAlert(expr, obj) {
  let type;
  switch (expr) {
    case "gcal":
      type =
        " -is an event from your google calendar, and will be added to your profile calendar automatically";
      break;
    case "Mangoes":
    case "gcalProfile":
      type =
        " -go to your google calendar to edit your personal events. Please try again and select a highlighted event to edit";
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
  window.alert(`${obj?.title} ${type}`);
}

// export function convertToTimeInput(date) {
//   const dateFormatted = format(date, "EEEE',' MMMM d',' ha");
//   return dateFormatted;
// }

export function convertToTimeInput(date) {
  const dateFormatted = format(date, "kk:mm");
  return dateFormatted;
}

export function formatLocal(start) {
  if (!start) return;
  return start.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}
