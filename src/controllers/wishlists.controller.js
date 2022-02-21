const Wishlist = require('../models/wishlist.model');
const User = require('../models/user.model');

exports.create = (req, res) => {
    Wishlist.findOne({user: req.body.user})
    .then((data) => {
        if (!data) {
            const wishlist = new Wishlist({
                user: req.body.user,
                movies: req.body.movies
            });
            wishlist.save()
            .then((data) => {
                User.findByIdAndUpdate(req.body.user, {$push: {wishlist: data._id}}).then(() => {
                    res.send({
                        data: data,
                    })
                    .catch((err) => res.send(err));
                });
                res.send({
                    data: data,
                })
            })
            .catch((err) => {
                console.log(err.message);    
                res.status(500).send({
                    error: 500,
                    message: err.message || "some error occured while creating wishlist"
                })
            })
        }
        else {
            const moviesData = data.movies;
            if (moviesData.includes(req.body.movies)) {
                res.send({
                    message: "Movie already in your wishlist"
                });
            }
            else {
                Wishlist.findOneAndUpdate(
                    {user: req.body.user},
                    {$push: {movies: req.body.movies}}
                )
                .then((data) => {
                    res.send({
                        data: data
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message || "NULL"
                    })
                })
            }
        }
    })

}


exports.getOne = (req, res) => {
    Wishlist.findById(req.params.id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}



exports.deleteOne = (req, res) => {

    Wishlist.findOneAndUpdate(
        {user: req.body.user},
        {$pull: {movies: req.body.movies}}
    )
    .then((data) => {
        res.send({
            data: data
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message || "NULL"
        })
    })
};