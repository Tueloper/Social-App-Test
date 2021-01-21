const bcrypt = require('bcryptjs')

const hash = async function (user) {
  user.password = await bcrypt.hash(user.password, 8);
  
  await user.save();
}

const compareHash = async function (password, passwordConfirm) {
  return await bcrypt.compare(password, passwordConfirm)
}

module.exports = {hash, compareHash};