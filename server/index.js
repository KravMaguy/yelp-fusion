const dotenv = require("dotenv");
dotenv.config();
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const axios = require("axios");

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.token}`;
axios.defaults.baseURL = "https://api.yelp.com/v3/";
app.use(
  cookieSession({
    name: "session",
    keys: ["yelp-fusion"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
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
  const body = req.body;
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

app.listen("5000", () => {
  console.log("Server is running!");
});
