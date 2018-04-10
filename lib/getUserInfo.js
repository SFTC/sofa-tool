const gi = require('./gi');
const user = {};

user.getUserInfo = () => {
  return gi('author', (err, result) => {
    const author = result ? result.author : null;
    return author;
  });
};

module.exports = user;