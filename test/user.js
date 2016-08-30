import test from 'ava'
import superkoa from 'superkoa'

// 1、引入`mongoose connect`
require('../db');

// 2、引入`User` Model
const User = require('../app/models/user');

// 3、定义`user` Entity
let user = new User({
  username: 'i5ting',
  password: '0123456789'
});

test.cb('#save()', t => {
  user.save((err, u) => {
    if (err) log(err)
    t.is(u.username, 'i5ting');
    t.end()
  });
});
