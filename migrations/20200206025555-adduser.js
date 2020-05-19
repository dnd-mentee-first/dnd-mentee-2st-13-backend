'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mts_user', { 
      id: {
          type: Sequelize.INTEGER(11),
          allowNULL: false,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: Sequelize.STRING(100),
          allowNULL: false,
          unique: true
      },
      user_email: {
          type: Sequelize.STRING(100),
          allowNULL: false,
          unique: true,
          validate: { isEmail: true }
      },
      user_password: {
          type: Sequelize.STRING(100),
          allowNULL: false
      },
      user_name: {
          type: Sequelize.STRING(100),
          allowNULL: false
      },
      admin_yn: {
          type: Sequelize.BOOLEAN,
          allowNULL: false
      },
      create_date: {
          type: Sequelize.DATE,
          allowNULL: true,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      update_date: {
          type: Sequelize.DATE,
          allowNULL: true,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('mts_user');

  }
};
