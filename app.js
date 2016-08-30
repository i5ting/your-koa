require('./db')

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const mount = require('mount-koa-routes');
const $middlewares = require('mount-middlewares')(__dirname)

// middlewares
app.use($middlewares.compress)
app.use($middlewares.bodyparser)
app.use($middlewares.json)
app.use($middlewares.serve)
app.use($middlewares.api)
app.use($middlewares.views)
app.use($middlewares.favicon)

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/app/views', {
  extension: 'jade'
}));

// logger
app.use( (ctx, next) => {
  const start = new Date();
  return next().then(function(){
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

mount(app,  __dirname + '/app/routes', true);

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

console.log('222')

module.exports = app;