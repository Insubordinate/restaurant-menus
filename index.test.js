const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index');
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {


    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const testRestaurant = await Restaurant.bulkCreate(seedRestaurant)
        results = await Restaurant.findAll({raw:true})
        expect(results.length).toEqual(3)
        for(let i = 0; i < 3;i++){
            testObj = results[i]
            knownObj = seedRestaurant[i]
            expect(testObj.name).toEqual(knownObj.name)
            expect(testObj.location).toEqual(knownObj.location)
            expect(testObj.cuisine).toEqual(knownObj.cuisine)
            expect(testObj.rating).toEqual(knownObj.rating)
        }

    });

    test('can create a Menu', async () => {
        const testMenu = await Menu.bulkCreate(seedMenu)
        results = await Menu.findAll({raw:true})
        expect(results.length).toEqual(3)
        
    });

    test('can find Restaurants', async () => {
        const testRestaurant = await Restaurant.bulkCreate(seedRestaurant)
        results = await Restaurant.findRestaurants('AppleBees')
        expect(results.length).toEqual(1)
    });

    test('can find Menus', async () => {
        const testMenu = await Menu.bulkCreate(seedMenu)
        results = await Menu.findMenu('Breakfast')
        expect(results.length).toEqual(1)
    });

    
    test('can delete Restaurants', async () => {
        const testRestaurant = await Restaurant.bulkCreate(seedRestaurant)
        Restaurant.deleteRestaurant('AppleBees')
        results = await Restaurant.findAll({raw:true})
        expect(results.length).toEqual(2)
    });

})