const { DataTypes } = require("sequelize");
const db = require("./db");

const Option = db.define('Option', {
    option_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    poll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_eliminated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Option;