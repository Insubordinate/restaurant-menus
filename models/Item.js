const {sequelize} = require('../db');
const { Sequelize,Model } = require('sequelize');


class Item extends Model{}

Item.init({name:Sequelize.STRING,image:Sequelize.STRING,price:Sequelize.INTEGER,vegetarian:Sequelize.BOOLEAN},{sequelize})

module.exports={Item}