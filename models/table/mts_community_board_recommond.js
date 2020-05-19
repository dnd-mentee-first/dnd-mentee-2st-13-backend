module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_community_board_recommond', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        board_id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false
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
        tableName: 'mts_community_board_recommond',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};