const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("characters", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        filename:{
            type: DataTypes.STRING,
        },
        path:{
            type: DataTypes.STRING,
        },
        originalname:{
            type: DataTypes.STRING,
        },
        mimetype:{
            type: DataTypes.STRING,
        },
        size:{
            type: DataTypes.INTEGER
        }
    })
}