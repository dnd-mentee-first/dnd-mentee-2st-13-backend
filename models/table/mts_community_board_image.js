module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_community_board_image', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        board_image_path: {
            type: DataTypes.STRING(255),
            allowNULL: false,
            defaultValue: ''
        },
        board_id: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'mts_community_board_image',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};