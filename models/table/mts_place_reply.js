module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_place_reply', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        content_id: {
            type: DataTypes.STRING(100),
            allowNULL: false,
        },
        reply_content: {
            type: DataTypes.TEXT()
        },
        write_id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false
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
        tableName: 'mts_place_reply',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};