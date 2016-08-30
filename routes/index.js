var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  console.log('1111')
  
  return ctx.render('index', {
  });
})
module.exports = router;
