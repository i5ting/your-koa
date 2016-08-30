import test from 'ava'
import superkoa from 'superkoa'

var req = superkoa(require('path').resolve(__dirname, '../app'))
  
test.cb("POST /users/register", t => {
  req
    .post('/users/register2')
    .field('username', 'stuq')
    .field('password', '123456')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, function (err, res) {
      t.ifError(err)

      t.is(res.body.info, 'register sucess', 'res.text == Hello Koa')
      t.end()
    });
});