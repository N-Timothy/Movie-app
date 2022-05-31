let mode =["now_showing", "top_rated", "popular", "upcoming"]

module.exports = app => {
    const movie = require("../controllers/movie.controller.js")
    var router = require("express").Router();
        // create new movie
        router.post("/:name", movie.create);
        // Retrive all movie
        router.get("/:name", movie.findAll);
        // Retrieve all single movie with id
        router.get("/:name/:id", movie.findOne);
        // update movie with id
        router.put("/:name/:id", movie.update);
        // Delete movie with id
        router.delete("/:name/:id", movie.delete);
         // Delete all Tutorials
        router.delete("/:name", movie.deleteAll);
        app.use(`/api`, router);
};