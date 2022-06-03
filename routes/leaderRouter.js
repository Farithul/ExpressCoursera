const express = require('express')
const leaderRouter = express.Router()
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');


const Leaders = require('../models/leaders');
leaderRouter.use(bodyParser.json());
// middleware that is specific to this router
leaderRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


leaderRouter.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');   
})


leaderRouter.route('/')
.get((req,res,next) => {
  Leaders.find({})
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
  Leaders.create(req.body)
  .then((Leaders) => {
      console.log('leader Created ', Leaders);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(Leaders);
  }, (err) => next(err))
  .catch((err) => next(err));
})

.put(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /Promotions');
})
.delete(authenticate.verifyUser,(req, res, next) => {
  Leaders.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});



leaderRouter.route('/:leaderId')
.get((req,res,next) => {
  Leaders.findById(req.params.leaderId)
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/'+ req.params.leaderId);
})
.put(authenticate.verifyUser,(req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((Leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
  Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = leaderRouter
