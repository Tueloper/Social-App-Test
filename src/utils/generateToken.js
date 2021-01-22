// const User = require('./../models')
const jwt = require('jsonwebtoken');

const generateAuthToken = async function ({ _id, fullname, username }) {
  const token = jwt.sign({ _id, fullname, username  }, process.env.SECRET, { expiresIn: '1 Day'} );
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
}

module.exports = generateAuthToken;