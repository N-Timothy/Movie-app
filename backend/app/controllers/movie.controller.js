const Movie = require("../models/movie.model.js");

exports.create = (req, res) => {
  if(!req.body) {
      res.status(400).sned({
          message: "content cannot be empty"
      });
  }
  console.log(req);
  const movie = new Movie({
      title: req.body.title,
      overview: req.body.overview,
      posterPath: req.body.posterPath
  });
  //save in database
  Movie.create(movie, req.params.name , (e, data) => {
      if(e) {
          res.status(500).sned({
              message: e.message || 
              "Cannot inser new movie to database"
          });
      } else res.send(data);
  });
};

// Retrieve allMovie from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    Movie.getAll(title, req.params.name, (e, data) => {
        if(e) {
            res.status(500).sned({
                message: e.message || 
                "Cannot get movie to database"
            });
        } else {
          const page = req.query.page;
          const limit = req.query.limit;
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          const result = data.slice(startIndex, endIndex);
          res.send(result);
        }
    });
};

// Find a single Movie with a id
exports.findOne = (req, res) => {
    Movie.findById(req.params.id, req.params.name, (e, data) => {
        if(e){
            if(e.kind === "not_found") {
                res.status(404).sned({
                    message: `Not found movie with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error get movie with id ${req.params.id}` 
                });
            }
        } else res.send(data);
    })
};

// Update a Movie identified by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "The content is empty"
        });
    }
    console.log(req.body);
    Movie.updateById(
        req.params.id,
        new Movie(req.body),
        req.params.name, (e, data) => {
            if (e) {
                if (e.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found movie with id ${req.params.id}.`
                  });
                } else {
                  res.status(500).send({
                    message: `Error Movie Tutorial with id ${req.params.id}`
                  });
                }
              } else res.send(data);
        }
    )
};

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  Movie.remove(req.params.id, req.params.name, (e) => {
      if(e) {
        if (e.kind === "not_found") {
            res.status(404).send({
              message: `Not found Movie with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Could not delete Movie with id ${req.params.id}`
            });
          }
        } else res.send({ message: `Movie  with id : ${req.params.id} was deleted successfully!` });
  })
};

exports.deleteAll = (req, res) => {
    Movie.removeAll(req.params.name ,(e) => {
        if (e)
          res.status(500).send({
            message:
              e.message
          });
        else res.send({ message: `All Movie from ${req.params.name} were deleted successfully!` });
      });
};