import test from 'ava'
import superkoa from 'superkoa'

var model = 'locations'

var location

var app = require('path').join(__dirname, '../../app.js')

var mockLocation = {
  // 'locationname': 'alfred',
  // 'password': '000000'
}

test.before(function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .send(mockLocation)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  location = res.body.location

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /locations[/]        => location.list()
 *  GET    /locations/new       => location.new()
 *  GET    /locations/:id       => location.show()
 *  GET    /locations/:id/edit  => location.edit()
 *  POST   /locations[/]        => location.create()
 *  PATCH  /locations/:id       => location.update()
 *  DELETE /locations/:id       => location.destroy()
 *
 */

// *  GET    /locations[/]        => location.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /locations/new       => location.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa(app)
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\slocation/)
})

// *  GET    /locations/:id       => location.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockLocation)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  location = res1.body.location

  var res = yield superkoa(app)
    .get('/' + model + '/' + location._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /locations/:id/edit  => location.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockLocation)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  location = res1.body.location

  var res = yield superkoa(app)
    .get('/' + model + '/' + location._id + '/edit')

  t.is(200, res.status)
  t.regex(res.text, /Editing\slocation/)
})

// *  POST   /locations[/]        => location.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/' + model)
    .send(mockLocation)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /locations/:id       => location.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa(app)
    .patch('/' + model + '/' + location._id)
    .send({
      'locationname': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /locations/:id       => location.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockLocation)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  location = res1.body.location

  var res = yield superkoa(app)
    .del('/' + model + '/' + location._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .field('locationname', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:location_id', function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model + '/:location_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:location_id', function * (t) {
  var res = yield superkoa(app)
    .patch('/api/' + model + '/:location_id')
    .field('locationname', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:location_id', function * (t) {
  var res = yield superkoa(app)
    .delete('/api/' + model + '/:location_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
