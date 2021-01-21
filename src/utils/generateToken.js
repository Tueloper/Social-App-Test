// const User = require('./../models')
const jwt = require('jsonwebtoken');

const generateAuthToken = async function (user) {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expiresIn: '1 Day'} );
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
}

module.exports = generateAuthToken;