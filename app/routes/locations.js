"use strict";

var router = require('koa-router')();
const co = require('co');

var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).locations_controller;

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

router.get('/new', $.new); 
 
router.get('/:id/edit', $.edit);

router.get('/', $.list);

router.post('/', $.create);

router.get('/:id', $.show);

router.patch('/:id', $.update);

router.delete('/:id', $.destroy);

// -- custom routes




module.exports = router;