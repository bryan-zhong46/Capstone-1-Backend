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
    },
    vote_date: {
        type: DataTypes.DATE,
    },
    rank: {
        tyep: DataTypes.INTEGER,
    }
});

PollVote.belongsTo(models.User, {foreignKey: 'user_id'});
PollVote.belongsTo(models.Poll, {foreignKey: 'poll_id'});
PollVote.belongsTo(models.Option, {foreignKey: 'option_id'});

module.exports = PollVote;