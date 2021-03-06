'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const settingsId = await queryInterface.rawSelect('settings', { where: {}, limit: 1 }, ['id']);
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: 'contato@gmail.com',
        password: bcrypt.hashSync('123456'),
        apiUrl: 'https://testnet.binance.vision/api/',
        accessKey: 'Fn1ALGFZHqb1Xq1hG3w0gpm9ig8vs5cKHMH9mLWtvWYpHzdiG7a0KiEGt96hPgcz',
        secretKey: crypto.encrypt('dpCwSWu2sogYCL56pACkFH2pJTvdubKFrPbFiDJeqKAaNMkt8gLb8AZmqcX26TeK'),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    } 
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('settings', null, {});
  }
};
