module.exports = (sequelize, DataTypes) => {
    return sequelize.define('mts_user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNULL: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING(100),
            allowNULL: false,
            unique: true
        },
        user_email: {
            type: DataTypes.STRING(100),
            allowNULL: false,
            unique: true,
            validate: { isEmail: true }
        },
        user_password: {
            type: DataTypes.STRING(100),
            allowNULL: false
        },
        user_name: {
            type: DataTypes.STRING(100),
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
        admin_yn: {
            type: DataTypes.BOOLEAN,
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        tableName: 'mts_user',
        timestamps: false,
        engine: 'InnoDB',
        charset: 'utf8',
    }

    );
};