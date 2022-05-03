const router = require('express').Router(),
      jwt_decode = require('jwt-decode');
      const User = require('../models/users');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
  res.render('registerBid', {title:"REGISTER TO BID",user:user});
});
router.get('', async (req, res, next) => {
  var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
  res.render('home', {title:"HOME", user:user});
});



/* GET user profile. */
router.get('/profile', (req, res, next) => {

    res.send(jwt_decode(req.session.token));
    
});

module.exports = router;