const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const axios = require("axios");
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.token}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const token = process.env.TOKEN;

const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

mongoose.connect(process.env.connection, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
  givenName: String,
  familyName: String,
  imageUrl: String,
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

app.post("/createlogin/", async (req, res) => {
  console.log("I will enter the user");
  const body = req.body;
  console.log("here is the body", body);
  const { googleId, imageUrl, email, givenName, familyName } = body;
  User.findOrCreate(
    { googleId, imageUrl, email, givenName, familyName },
    function (err, user) {
      if (err) {
        return console.log("err", err);
      } else if (user) {
        return res.json(res.data);
      }
    }
  );
});

app.post("/api/", async (req, res) => {
  const body = req.body;
  const { term, place } = body;
  axios
    .get(
      "businesses/search?term=" +
        term +
        "&location=" +
        place +
        "&limit=3&sortby=distance"
    )
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.get("/categories", async (req, res) => {
  axios
    .get("/categories")
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});
app.get("/buisnesses/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id, ": the id");
  axios
    .get(`businesses/${id}`)
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.get("/autocomplete/:text", async (req, res) => {
  console.log(req.params, "the params");
  const { text } = req.params;
  axios
    .get(`/autocomplete?text=${text}`)
    .then((response) => res.json(response.data))
    .catch((err) => res.status(err.response.status).send(err.message));
});

app.listen(port, () => console.log(`App is running on port ${port}`));
