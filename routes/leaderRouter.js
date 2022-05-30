const express = require('express')
const leaderRouter = express.Router()
const bodyParser = require('body-parser');

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

leaderRouter.get('/', (req, res) => {
    res.send('will send the all the leader details..')
  })
  leaderRouter.get('/:dishId', (req, res) => {
    res.send('will send the one leader detail '+ req.params.dishId +'');
  })
  leaderRouter.post('/',(req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
leaderRouter.put('/',(req, res, next) => {
  //  res.statusCode = 403;
   res.end('updated the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
leaderRouter.delete('/',(req, res, next) => {
    res.end('Deleting all leaders');
});


module.exports = leaderRouter