var User = require('../models/user')
var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});

router.post('/register2', function(ctx, next) {
  var name = ctx.request.body.username;
  var password = ctx.request.body.password;
  
  var u = new User({
    "username":name,
    "password":password
  })
  console.log(u)
  return u.save(function (err, user) {
    console.log(err)
    console.log(user)
    if (err) {
      return ctx.body = {'info': 'register failed with err'};
    }
      
    return ctx.body = {'info': 'register sucess'};
  });
});

module.exports = router;
