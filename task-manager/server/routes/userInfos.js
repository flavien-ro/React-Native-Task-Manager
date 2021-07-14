const express = require('express');
const router = express.Router();
const verifToken = require('./verifyToken');
const User = require('../models/User');

router.get('/info', verifToken, async function (req, res) {
    const _user = await User.findOne({email: req.body.email});

    res.json(_user);
});
  

module.exports = router;