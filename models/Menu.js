const {sequelize} = require('../db');
const { Sequelize,Model } = require('sequelize');



class Menu extends Model{
    static async findMenu(columnValue){
        return await this.findAll({
            where:{
                'title':columnValue
            },
            raw:true
        })

    }

    static async deleteMenu(toDelete){
        await this.destroy({
            where:{
                'title':toDelete
            }
        })
        return `${toDelete} was deleted`
    }

}

Menu.init({
    title:Sequelize.STRING
},{sequelize})



module.exports = {Menu};