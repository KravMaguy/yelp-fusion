const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const axios = require("axios");
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
const token = process.env.TOKEN;
app.use("/api/", async (req, res, next) => {
  const body = req.body;
  const { term } = body;
  axios
    .get(
      "https://api.yelp.com/v3/businesses/search?term=" +
        term +
        "&location=Naperville",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.listen(port, () => console.log(`App is running on port ${port}`));
