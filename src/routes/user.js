const express = require('express');
const auth = require('../middleware/auth');
require('../db/mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const multer = require('multer');
const sharp = require('sharp');

const { transporter, mailOptions } = require('../email/account');

const router = new express.Router();

/* transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error(err);
  else console.log('Email sent:', info.response);
}); */

//user creation
router.post('/users', async (req, res) => {
  //console.log(`[${req.method}] ${req.originalUrl}`);
  try {
    const user = new User(req.body);
    await user.save();
    //know we need to generate a token
    const token = await user.generateToken();
    mailOptions.text = `Thank you very much ${user.name} for your subscription !!!`;
    mailOptions.subject = 'Thank you for your subscription';
    // await transporter.sendMail(mailOptions);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.getCredentials(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tok) => tok.token !== req.token);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    await req.user.populate('tasks');
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['email', 'password', 'age', 'name'];
  const isUpdateAllowed = updates.every((upd) => allowUpdates.includes(upd));
  if (!isUpdateAllowed) return res.status(400).send('update not allowed');
  try {
    updates.forEach((upd) => (req.user[upd] = req.body[upd]));
    req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    mailOptions.text = `Dear ${user.name}, we hope to see soon again !!!`;
    mailOptions.subject = 'Sorry to see you leaving us !!!';
    // await transporter.sendMail(mailOptions);
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(png|jpg|jpeg)$/))
      return cb(new Error('Please choose an image file !!!'));
    cb(undefined, true);
  },
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) throw new Error();
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
