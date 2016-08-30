"use strict";

/**
 * Created by Moajs on August 30th 2016, 7:15:46 pm.
 */
 
var $models = require('mount-models')(__dirname);

var Location = $models.location;


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /locations => list, query: ' + JSON.stringify(ctx.query));

  return Location.getAllAsync().then((locations)=>{
    console.log(locations)
    return ctx.render('locations/index', {
      locations : locations
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /locations/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('locations/new', {
    location : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /locations/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return Location.getByIdAsync(id).then( location => {
    console.log(location);
    return ctx.render('locations/show', {
      location : location
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /locations/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return Location.getByIdAsync(id).then( location => {
    console.log(location);
    location._action = 'edit';

    return ctx.render('locations/edit', {
      location : location
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /locations => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return Location.createAsync({name: ctx.request.body.name,coordinates: ctx.request.body.coordinates}).then( location => {
    console.log(location);
    return ctx.render('locations/show', {
      location : location
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /locations/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return Location.updateById(id,{name: ctx.request.body.name,coordinates: ctx.request.body.coordinates}).then( location => {
      console.log(location);

      return ctx.body = ({
        data:{
          redirect : '/locations/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /locations/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return Location.deleteByIdAsync(id).then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    var location_id = ctx.api_location._id;

    return Location.queryAsync({}).then((locations) => {
      return ctx.api({
        locations : locations
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    var location_id = ctx.api_location._id;
    var id = ctx.params.location_id;

    return Location.getByIdAsync(id).then((location)=>{
      return ctx.api({
        location : location
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    var location_id = ctx.api_location._id;

    return Location.createAsync({name: ctx.request.body.name,coordinates: ctx.request.body.coordinates}).then(location=> {
      return ctx.body = ({
        location : location
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    var location_id = ctx.api_location._id;
    var id = ctx.params.location_id;
    return Location.updateByIdAsync(id, {name: ctx.request.body.name,coordinates: ctx.request.body.coordinates}).then(location=> {
      return ctx.api({
        location : location,
        redirect : '/locations/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    var location_id = ctx.api_location._id;
    var id = ctx.params.location_id;

    return Location.deleteByIdAsync(id).then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
