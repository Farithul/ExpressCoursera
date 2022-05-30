const express = require('express')
const dishRouter = express.Router()
const bodyParser = require('body-parser');

dishRouter.use(bodyParser.json());
// middleware that is specific to this router
dishRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


dishRouter.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');   
})

dishRouter.get('/', (req, res) => {
    res.send('will send the all the dish details..')
  })
  dishRouter.get('/:dishId', (req, res) => {
    res.send('will send the one dish detail '+ req.params.dishId +'');
  })
  dishRouter.post('/',(req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
dishRouter.put('/',(req, res, next) => {
  //  res.statusCode = 403;
   res.end('updated the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
dishRouter.delete('/',(req, res, next) => {
    res.end('Deleting all dishes');
});


module.exports = dishRouter