const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const axios = require("axios");
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.token}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/businesses";

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
const token = process.env.TOKEN;
app.post("/api/", async (req, res) => {
  const body = req.body;
  const { term } = body;
  axios
    .get("/search?term=" + term + "&location=Naperville")
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.get("/buisnesses/:id", async (req, res) => {
  const { id } = req.params;
  axios
    .get(`/${id}`)
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.listen(port, () => console.log(`App is running on port ${port}`));
