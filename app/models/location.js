"use strict";

/**
 * Created by alfred on August 30th 2016, 7:15:46 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var locationSchema = new Schema(
    {"name":"String","coordinates":"String"}
);

var Location = mongoose.model('Location', locationSchema);
var LocationDao = new MongooseDao(Location);
 
module.exports = LocationDao;