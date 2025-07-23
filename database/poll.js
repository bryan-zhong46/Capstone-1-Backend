const { DataTypes } = require("sequelize");
const db = require("./db");

const Poll = db.define('Poll', {
    poll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    creator_id: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        defaultValue: 0,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    expiration: {
        type: DataTypes.DATE,
    },
    number_of_votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    auth_required: {
        type: DataTypes.BOOLEAN,
    },
    poll_status: {
        type: DataTypes.ENUM('draft', 'published', 'closed'),
    },
    isDisabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = Poll;