const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const axios = require("axios");
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.token}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const token = process.env.TOKEN;

const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

mongoose.connect(process.env.connection, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  googleId: String,
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get(
  "/auth/google",
  (req, res, next) => {
    console.log("auth with google");
    next();
  },
  passport.authenticate("google", { scope: ["profile"] })
);

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
