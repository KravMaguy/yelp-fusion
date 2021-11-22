const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const app = express();
app.get("/api", (req, res) => {
  axios
    .get(
      "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.json(res.data))
    .catch((err) => console.log("the error is: ", err.message));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
