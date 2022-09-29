import config from 'config';

module.exports = function () {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: private key is not defined');
  }
};
