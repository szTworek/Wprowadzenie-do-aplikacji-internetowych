
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.db'
});


const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const Order = sequelize.define('Order', {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


sequelize.sync().then(() => console.log('Database synced'));

module.exports = { sequelize, Book, Order, User };
