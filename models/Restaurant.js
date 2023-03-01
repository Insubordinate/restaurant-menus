const {sequelize} = require('../db');
const { Sequelize,Model } = require('sequelize');


class Restaurant extends Model{
    static async findRestaurants(columnValue){
        return await this.findAll({
            where : {
                'name':columnValue
            },
            raw:true
        })
    }
    static async deleteRestaurant(toDelete){
        await this.destroy({
            where:{
                'name':toDelete
            }
        })
        return `${toDelete} was deleted`
    }
}

Restaurant.init({
    name: Sequelize.STRING,
    location: Sequelize.STRING,
    cuisine:Sequelize.STRING,
    rating:Sequelize.INTEGER
}, {sequelize});


module.exports = {Restaurant};