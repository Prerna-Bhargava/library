
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database-connection");


exports.users = sequelize.define('users', {
    id: {
        type: DataTypes.STRING(255),
        allowNUll: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNUll: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(138),
        allowNUll: false

    },
    role: {
        type: DataTypes.STRING(3),
        allowNUll: false
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


exports.category = sequelize.define('category', {
    Codenofrom: {
        type: DataTypes.STRING(255),
        allowNUll: false,
        primaryKey: true
    },
    CodenoTo: {
        type: DataTypes.STRING(30),
        allowNUll: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING(138),
        allowNUll: false

    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

