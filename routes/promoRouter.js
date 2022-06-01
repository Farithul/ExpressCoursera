const express = require('express')
const promoRouter = express.Router()
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Promotions = require('../models/promotions');
promoRouter.use(bodyParser.json());
// middleware that is specific to this router
promoRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


promoRouter.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');   
})

promoRouter.route('/')
.get((req,res,next) => {
  Promotions.find({})
    .then((Promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
  Promotions.create(req.body)
  .then((promotion) => {
      console.log('promotion Created ', promotion);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotion);
  }, (err) => next(err))
  .catch((err) => next(err));
})

.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /Promotions');
})
.delete((req, res, next) => {
  Promotions.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));    
});


promoRouter.route('/:promoId')
.get((req,res,next) => {
  Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.promoId);
})
.put((req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = promoRouter