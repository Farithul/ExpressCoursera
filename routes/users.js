var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require('body-parser');
var User = require('../models/user');
var indexRouter = require('../routes/index');
var authenticate = require('../authenticate');

router.use(bodyParser.json());


router.route('/')
.get(authenticate.verifyAdminUser,(req,res,next) => {
  if(req.user.admin == true)
  { 
  User.find({})
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err)); 
  }
  else{
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);

  }
})

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id,admin : req.user.admin});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!', isAdmin : req.user.admin});
});




router.get('/logout',authenticate.verifyAdminUser,(req, res,next) => {
  console.log(authenticate.verifyAdminUser);
  if (req.session) {
  console.log(res.user);
    req.session.destroy();
    res.clearCookie('session-id');
   // res.redirect('/', indexRouter);
   res.json({success: true, status: 'You are successfully logged out!'});
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});




module.exports = router;
