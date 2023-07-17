const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("comics", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        filename: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
        originalname: {
            type: DataTypes.STRING,
        },
        mimetype: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER
        }
    })
}