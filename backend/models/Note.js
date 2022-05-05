const { DataTypes } = require("sequelize")
const db = require("../services/dbconnector")

const Note = db.define("notes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    archived: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Note;

