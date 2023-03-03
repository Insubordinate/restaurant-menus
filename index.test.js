const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index');
const {
    seedRestaurant,
    seedMenu,
    seedItem
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


    test('Restaurant/Menu Association',async()=>{
        const testRestaurant = await Restaurant.create(seedRestaurant[0])
        const testMenu = await Menu.bulkCreate(seedMenu)

        let restaurantInstance = await Restaurant.findByPk(1)
        let menus = await Menu.findAll()
        await restaurantInstance.addMenus(menus)        
        let verifyData = await restaurantInstance.getMenus()
        expect(verifyData.length).toBe(3)

    })

    test('Menu/Item Associations',async()=>{
        await Menu.bulkCreate(seedMenu)
        await Item.bulkCreate(seedItem)

        let itemInstance = await Item.findAll()
        let menuInstance = await Menu.findAll()

        console.log(menuInstance)
        for(let i = 0;i<3;i++){
             await itemInstance[i].addMenus(menuInstance)
             await menuInstance[i].addItems(itemInstance)
         }

        console.log(await Item.findByPk(1,{include:Menu}))
         let verifiedDataItem = await Item.findAll({include:Menu})
         console.log(await verifiedDataItem)
         let verifiedDataMenu = await Menu.findAll({include:Item})
         for(let j = 0;j<3;j++){
             expect(verifiedDataItem[j].Menus.length).toBe(3)
             expect(verifiedDataMenu[j].Items.length).toBe(3)
         }

    })
})