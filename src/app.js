const express = require("express");
require("dotenv").config();
const app = express();
const validateMovie = require("../middlewares/validateMovie");
const validateUser = require("../middlewares/validateUser");
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.get("/api/users/:id", movieControllers.getUserById);


app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, movieControllers.postUser);


app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.put("/api/users/:id", validateUser, movieControllers.updateUser);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", movieControllers.deleteUser);
module.exports = app;
