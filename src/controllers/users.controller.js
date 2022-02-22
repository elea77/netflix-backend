const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin,
            abonnement: req.body.abonnement
        });
        user.save()
            .then((data) => {
                let userToken = jwt.sign({
                    id: data._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 86400,
                }
            );
            res.send({
            token:userToken,
            auth: true
         })
    })
    .catch((err) => {
        console.log("msg:" + err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating user"
        })
      })
    })

}

exports.getAll = (req, res) => {
  User.find().then(
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
    User.findById(req.user.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.user.id} not found`,
          // message:"User with id" + req.params.id +"not found"
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
}

exports.getOneByEmail = (req, res) => {
    User.findOne({email: req.params.email})
    .then((data) => {
      if (!data) {
        res.status(200).send({
          message: false,
        });
      }
      res.status(200).send({
        message: true,
      });
    })
    .catch((err) => res.send(err));
}


exports.login = (req, res) => {
    User.findOne({
      email: req.body.email,
    })
    .then((data) => {
          
    if (!data) {
      return res.status(404).send({
        auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
      });
    }
  
    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      data.password
    );
  
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: 'password is not valid',
      });
    }
  
    let userToken = jwt.sign(
      {
        id: data._id,
        isAdmin: data.isAdmin
      },
      process.env.JWT_SECRET,
        {expiresIn: 86400}
      );
  
      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};


exports.updateOne = (req, res) => {
  var user = User.findById(req.params.id)

  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  )
  .then((data) => {
    user
    res.send({
      user: data
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

  var user = User.findById(req.params.id)
  User.remove(user)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
  
};

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).json({
      verify:true,
      isAdmin: req.user.isAdmin
    })
  }
}