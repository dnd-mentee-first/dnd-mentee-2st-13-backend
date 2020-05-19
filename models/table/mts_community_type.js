module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_community_type', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        type_code: {
            type: DataTypes.STRING(5),
            allowNULL: false,
            unique: true
        },
        type_name: {
            type: DataTypes.STRING(100),
            allowNULL: false,
        },
        create_date: {
            type: DataTypes.DATE,
            allowNULL: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        update_date: {
            type: DataTypes.DATE,
            allowNULL: true,
            defaultValue: null
        }
    },
    {
        tableName: 'mts_community_type',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};