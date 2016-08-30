import test from 'ava'
import superkoa from 'superkoa'

var model = 'orders'

var order

var mockOrder = {
  // 'ordername': 'alfred',
  // 'password': '000000'
}

test.before(function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mockOrder)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  order = res.body.order

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /orders[/]        => order.list()
 *  GET    /orders/new       => order.new()
 *  GET    /orders/:id       => order.show()
 *  GET    /orders/:id/edit  => order.edit()
 *  POST   /orders[/]        => order.create()
 *  PATCH  /orders/:id       => order.update()
 *  DELETE /orders/:id       => order.destroy()
 *
 */

// *  GET    /orders[/]        => order.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /orders/new       => order.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\sorder/)
})

// *  GET    /orders/:id       => order.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mockOrder)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  order = res1.body.order

  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + order._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /orders/:id/edit  => order.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mockOrder)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  order = res1.body.order

  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + order._id + '/edit')

  t.is(200, res.status)
  t.regex(res.text, /Editing\sorder/)
})

// *  POST   /orders[/]        => order.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/' + model)
    .send(mockOrder)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /orders/:id       => order.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/' + model + '/' + order._id)
    .send({
      'ordername': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /orders/:id       => order.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mockOrder)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  order = res1.body.order

  var res = yield superkoa('../../app.js')
    .del('/' + model + '/' + order._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .field('ordername', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:order_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model + '/:order_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:order_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/api/' + model + '/:order_id')
    .field('ordername', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:order_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .delete('/api/' + model + '/:order_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
