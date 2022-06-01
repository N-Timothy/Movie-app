const sql = require("./db.js")

const Movie = function(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.posterPath = movie.posterPath;
};

Movie.create = (newMovie, mode = "now_showing", result) => {
    sql.query(`INSERT INTO ${mode} SET ? `, newMovie, (e, res) => {
        if(e) {
            console.log("error: ", e) // if error
            result(e, null);
            return;
        }
        console.log(`created movie in ${mode}: `, {id: res.insertedId, ...newMovie});
        result(null, {id: res.insertedId, ...newMovie});
    });
};
Movie.findById = (id, mode = "now_showing", result) => {
    sql.query(`SELECT * FROM ${mode} WHERE ID = ${id}`, (e, res) => {
        if(e) {
            console.log("error : ", e);
            result(e, null);
            return;
        }
        if(res.length) {
            console.log("found movie: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not found"}, null);
    });
};
Movie.getAll = (title, mode = "now_showing", result) => {
    let query = `SELECT * FROM ${mode}`;
    if(title) {
        query += `WHERE title LIKE '%${title}'`;
    }
    sql.query(query, (e, res) => {
        if(e){
            console.log("error : ", e);
            result(null, e);
            return;
        }
        console.log("movie: ", res);
        result(null, res);
    });
};
Movie.updateById = (id, movie, mode = "now_showing", result) => {
    sql.query(
        `UPDATE ${mode} SET title = ? , overview = ?, posterPath = ? WHERE id = ?`,
        [movie.title, movie.overview, movie.posterPath, id], (e, res) => {
            if(e){
                console.log("error: ", e);
                result(null, e);
                return;
            }
            if(res.affectedRows == 0){
                result({kind: "not_found"}, null);
                return;
            }
            console.log("updated movie: ", {id: id, ...movie});
            result(null, {id: id, ...movie})
        }
    );
};
Movie.remove = (id, mode = "now_showing", result) => {
    sql.query(`DELETE FROM ${mode} WHERE id = ?`, id, (e,res) => {
        if(e) {
            console.log("error: ", e);
            result(null, e);
            return;
        }
        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }
        console.log(`deleted from ${mode} with id: `, id);
        result(null, res);
    });
};

Movie.removeAll = (mode, result) => {
    sql.query(`DELETE FROM ${mode}`, (e, res) => {
      if (e) {
        console.log("error: ", e);
        result(null, e);
        return;
      }
      console.log(`deleted ${res.affectedRows} ${mode}`);
      result(null, res);
    });
  };


module.exports = Movie;