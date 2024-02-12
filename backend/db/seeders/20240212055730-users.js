'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const userSeeds = [
  {
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user1@user.io',
    username: 'fakeUser1',
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    email: 'user2@user.io',
    username: 'fakeUser2',
    hashedPassword: bcrypt.hashSync('password3')
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(userSeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options)
  }
};
