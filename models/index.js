const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

Restaurant.hasMany(Menu)
Menu.hasOne(Restaurant)

Item.belongsToMany(Menu,{through:'ItemMenu'})
Menu.belongsToMany(Item,{through:'ItemMenu'})

module.exports = { Restaurant, Menu ,Item}
