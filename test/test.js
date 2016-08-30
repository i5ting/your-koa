import test from 'ava'
var superkoa = require('superkoa')

var req = superkoa(require('path').resolve(__dirname, '../app'))

test.cb("first test", t => {
  // console.log(superkoa('./app'))
  req
    .get("/")
    .expect(200, function (err, res) {
      t.ifError(err)
      var userId = res.body.id;
      
      // console.log(res)
      t.regex(res.text, /koa2\stitle/, 'res.text == Hello Koa')
      t.end()
    });
});