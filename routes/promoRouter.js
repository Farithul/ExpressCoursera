const express = require('express')
const promoRouter = express.Router()
const bodyParser = require('body-parser');

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

promoRouter.get('/', (req, res) => {
    res.send('will send the all the promotion details..')
  })
  promoRouter.get('/:dishId', (req, res) => {
    res.send('will send the one promotion detail '+ req.params.dishId +'');
  })
  promoRouter.post('/',(req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
promoRouter.put('/',(req, res, next) => {
  //  res.statusCode = 403;
   res.end('updated the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
promoRouter.delete('/',(req, res, next) => {
    res.end('Deleting all promotions');
});


module.exports = promoRouter