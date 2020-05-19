module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "mts_area",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true
      },
      area_code: {
        type: DataTypes.STRING(100),
        allowNULL: false,
        unique: true
      },
      area_name: {
        type: DataTypes.STRING(100),
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
      tableName: "mts_area",
      timestamps: false,
      engine: "InnoDB",
      charset: "utf8"
    }
  );
};
