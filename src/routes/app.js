const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/web/users', async (req, res) => {
  // res.send(users);
  //console.log(users);

  res.render('index', {
    title: 'Home Page',
    name: 'Mouhamadou Niang',
  });
});
router.get('/allusers', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
module.exports = router;
