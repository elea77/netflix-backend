const Movie = require('../models/movie.model');
const Category = require('../models/category.model');

exports.create = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
        categories: req.body.categories
    });

    movie.save()
    .then((data) => {
      Category.findByIdAndUpdate(req.body.categories, {$push: {movies: data._id}}).then(() => {
          res.send({
              data: data,
          })
          .catch((err) => res.send(err));
      });
      res.send({
          data: data,
          created: true
      })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating movie"
        })
    })

}

exports.getAll = (req, res) => {
    Movie.find().then(
        (data) => {
          res.status(200).json(data);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
}


exports.getOne = (req, res) => {
    var id = req.params.id;
    Movie.findById(id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}


exports.updateOne = (req, res) => {
    var movie = Movie.findById(req.params.id)
    var category = Category.findById(req.params.id)
  
    Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
        categories: req.body.categories
      }
    )
    Category.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date,
        categories: req.body.categories
      }
    )
    .then((data) => {
      movie
      res.send({
        movie: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || "NULL"
        })
  })
    
};


exports.deleteOne = (req, res) => {

  var movie = Movie.findById(req.params.id)
  Movie.remove(movie)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Movie with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
  
};