const Wishlist = require('../models/wishlist.model');
const User = require('../models/user.model');

exports.create = (req, res) => {
    const wishlist = new Wishlist({
        user: req.body.user,
        movies: req.body.movies
    });

    wishlist.save()
    .then((data) => {
        //
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


exports.getAll = (req, res) => {
    Wishlist.find({})
    .populate('products')
    .populate('user')
    .then(
        (data) => {
          res.send({
              data: data,
              created: true
          });
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
    Wishlist.findById(id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}



// exports.updateOne = (req, res) => {
//     var wishlist = Wishlist.findById(req.params.id)
  
//     Wishlist.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: req.body.status
//       }
//     )
//     .then((data) => {
//       wishlist
//       res.send({
//         wishlist: data
//       })
//     })
//     .catch((err) => {
//       res.status(500).send({
//         error: 500,
//         message: err.message || "NULL"
//         })
//     })  
// };
  