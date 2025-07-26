const { DataTypes } = require("sequelize");
const db = require("./db");

const PollVote = db.define('PollVote', {
    pollvote_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    poll_id: {
        type: DataTypes.INTEGER,
        //primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        //primaryKey: true,
    },
    option_id: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        //defaultValue: 0, //Have to connect this to option_id in option.js
    },
    vote_date: {
        type: DataTypes.DATE,
    },
    rank: {
        type: DataTypes.INTEGER,
    },
    isSubmitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = PollVote;