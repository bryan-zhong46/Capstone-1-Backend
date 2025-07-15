const { DataTypes } = require("sequelize");
const db = require("./db");

const PollVote = db.define('PollVote', {
    poll_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, //Have to connect this to option_id in option.js
    },
    vote_date: {
        type: DataTypes.DATE,
    },
    rank: {
        type: DataTypes.INTEGER,
    }
});

//PollVote.belongsTo(db.User, {foreignKey: 'user_id'});
//PollVote.belongsTo(db.Poll, {foreignKey: 'poll_id'});
//PollVote.belongsTo(db.Option, {foreignKey: 'option_id'});

module.exports = PollVote;