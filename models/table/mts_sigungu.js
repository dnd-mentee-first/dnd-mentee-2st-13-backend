module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "mts_sigungu",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true
      },
      sigungu_code: {
        type: DataTypes.STRING(100),
        allowNULL: false,
        unique: true
      },
      sigungu_name: {
        type: DataTypes.STRING(100),
        allowNULL: false
      },
      area_id: {
        type: DataTypes.INTEGER(11),
        allowNULL: false
      },
      create_date: {
        type: DataTypes.DATE,
        allowNULL: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
      },
      update_date: {
        type: DataTypes.DATE,
        allowNULL: true,
        defaultValue: null
      }
    },
    {
      tableName: "mts_sigungu",
      timestamps: false,
      engine: "InnoDB",
      charset: "utf8"
    }
  );
};
