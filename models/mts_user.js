'use strict';
module.exports = (sequelize, DataTypes) => {
  const mts_user = sequelize.define('mts_user', {
    user_id: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_name: DataTypes.STRING
  }, {});
  mts_user.associate = function(models) {
    // associations can be defined here
  };
  return mts_user;
};