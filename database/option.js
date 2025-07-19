const { DataTypes } = require("sequelize");
const db = require("./db");

const Option = db.define('Option', {
    options_id: {
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
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Option;