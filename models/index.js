'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.mts_area = require('./table/mts_area')(sequelize, Sequelize);
db.mts_community_board_image = require('./table/mts_community_board_image')(sequelize, Sequelize);
db.mts_community_board_recommond = require('./table/mts_community_board_recommond')(sequelize, Sequelize);
db.mts_community_board_reply = require('./table/mts_community_board_reply')(sequelize, Sequelize);
db.mts_community_board = require('./table/mts_community_board')(sequelize, Sequelize);
db.mts_community_type = require('./table/mts_community_type')(sequelize, Sequelize);
db.mts_sigungu = require('./table/mts_sigungu')(sequelize, Sequelize);
db.mts_place_reply  = require('./table/mts_place_reply')(sequelize, Sequelize);
db.mts_user = require('./table/mts_user')(sequelize, Sequelize);

//mts_user : mts_area(id / PK) - mts_user(area_id / FK)
db.mts_area.hasMany(db.mts_user, { foreignKey: 'area_id', sourceKey: 'id' });
db.mts_user.belongsTo(db.mts_area, { foreignKey: 'area_id', targetKey: 'id' });
//mts_user : mts_sigungu(id / PK) - mts_user(area_id / FK)
db.mts_sigungu.hasMany(db.mts_user, { foreignKey: 'sigungu_id', sourceKey: 'id' });
db.mts_user.belongsTo(db.mts_sigungu, { foreignKey: 'sigungu_id', targetKey: 'id' });

//mts_community_board_image : mts_community_board(id / PK) - mts_community_board_image(board_id / FK)
db.mts_community_board.hasMany(db.mts_community_board_image, { foreignKey: 'board_id', sourceKey: 'id' });
db.mts_community_board_image.belongsTo(db.mts_community_board, { foreignKey: 'board_id', targetKey: 'id' });

//mts_community_board_recommond : mts_community_board(id / PK) - mts_community_board_recommond(board_id / FK)
db.mts_community_board.hasMany(db.mts_community_board_recommond, { foreignKey: 'board_id', sourceKey: 'id' });
db.mts_community_board_recommond.belongsTo(db.mts_community_board, { foreignKey: 'board_id', targetKey: 'id' });
//mts_community_board_recommond : mts_user(id / PK) - mts_community_board_recommond(write_id / FK)
db.mts_user.hasMany(db.mts_community_board_recommond, { foreignKey: 'write_id', sourceKey: 'id'});
db.mts_community_board_recommond.belongsTo(db.mts_user, { foreignKey: 'write_id', targetKey: 'id'});

//mts_community_board_reply : mts_community_board(id / PK) - mts_community_board_reply(board_id / FK)
db.mts_community_board.hasMany(db.mts_community_board_reply, { foreignKey: 'board_id', sourceKey: 'id' });
db.mts_community_board_reply.belongsTo(db.mts_community_board, { foreignKey: 'board_id', targetKey: 'id' });
//mts_community_board_reply : mts_user(id / PK) - mts_community_board_reply(write_id / FK)
db.mts_user.hasMany(db.mts_community_board_reply, { foreignKey: 'write_id', sourceKey: 'id'});
db.mts_community_board_reply.belongsTo(db.mts_user, { foreignKey: 'write_id', targetKey: 'id'});

//mts_community_board : mts_area(id / PK) - mts_community_board(area_id / FK)
db.mts_area.hasMany(db.mts_community_board, { foreignKey: 'area_id', sourceKey: 'id' });
db.mts_community_board.belongsTo(db.mts_area, { foreignKey: 'area_id', targetKey: 'id' });
//mts_community_board : mts_community_type(id / PK) - mts_community_board(type_id / FK)
db.mts_community_type.hasMany(db.mts_community_board, { foreignKey: 'type_id', sourceKey: 'id' });
db.mts_community_board.belongsTo(db.mts_community_type, { foreignKey: 'type_id', targetKey: 'id' });
//mts_community_board : mts_sigungu(id / PK) - mts_community_board(sigungu_id / FK)
db.mts_sigungu.hasMany(db.mts_community_board, { foreignKey: 'sigungu_id', sourceKey: 'id' });
db.mts_community_board.belongsTo(db.mts_sigungu, { foreignKey: 'sigungu_id', targetKey: 'id' });
//mts_community_board : mts_user(id / PK) - mts_community_board(write_id / FK)
db.mts_user.hasMany(db.mts_community_board, { foreignKey: 'write_id', sourceKey: 'id' });
db.mts_community_board.belongsTo(db.mts_user, { foreignKey: 'write_id', targetKey: 'id' });

//mts_place_reply : mts_user(id / PK) - mts_place_reply(write_id / FK)
db.mts_user.hasMany(db.mts_place_reply, { foreignKey: 'write_id', sourceKey: 'id'});
db.mts_place_reply.belongsTo(db.mts_user, { foreignKey: 'write_id', targetKey: 'id'});

//mts_sigungu : mts_area(id / PK) - mts_sigungu(area_id / FK)
db.mts_area.hasMany(db.mts_sigungu, { foreignKey: 'area_id', sourceKey: 'id' });
db.mts_sigungu.belongsTo(db.mts_area, { foreignKey: 'area_id', targetKey: 'id' });

module.exports = db;
