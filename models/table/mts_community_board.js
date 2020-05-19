module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_community_board', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        board_title: {
            type: DataTypes.STRING(100),
            allowNULL: false
        },
        board_content: {
            type: DataTypes.TEXT(),
            allowNULL: false
        },
        area_id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false
        },
        sigungu_id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false
        },
        type_id: {
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
        tableName: 'mts_community_board',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};
