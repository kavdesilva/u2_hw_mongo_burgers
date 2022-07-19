// create 5 burgers (at least 3 should be beef)

db.burgers.insertMany([
    { name: 'Enoki Doki', type: 'veggie', toppings: ['enoki mushrooms', 'carrots', 'ginger', 'sake', 'soy sauce', 'baby spinach'], vegan: 'yes', cheese: 'no' },
    { name: 'Dont You Four Cheddar Bout Me', type: 'mushroom', toppings: ['four different vegan cheddars', 'lettuce', 'vegan bacon', 'onions'], vegan: 'yes', cheese: 'no' },
    { name: 'Baby You Can Chive My Car', type: 'beef', toppings: ['sour cream & mustard spread', 'chives', 'fried pickles'], vegan: 'no', cheese: 'no' },
    { name: 'Dark Side of the Shroom', type: 'beef', toppings: ['shiitake', 'pineapple', 'teriyaki sauce'], vegan: 'no', cheese: 'no' },
    { name: 'Never Been Feta', type: 'beef', toppings: ['Feta', 'arugula', 'mayo', 'mustard'], vegan: 'no', cheese: 'yes' }
])

// find all the burgers

db.burgers.find({})

// show just the meat of each burger

db.burgers.find( {}, { type: 1 } )

// show just the toppings of each burger

db.burgers.find( {}, { toppings: 1 } )

// show everything but the cheese

db.burgers.find( {}, { name: 1, type: 1, toppings: 1, vegan: 1 } )

// find all the burgers with beef

db.burgers.find( {type: 'beef'} )

// find all the burgers that are not beef

db.burgers.find( {type: {$ne:'beef'} } )

// find the first burger with cheese

db.burgers.find( {cheese: {$first:'yes'} } )
    // I looked up the '$first' operator online, but it doesn't work with my terminal. since only one of my burgers has cheese, 'db.burgers.find( {cheese: 'yes'} )' fulfills the prompt, but I'm not sure how to go about this otherwise.

// find one and update the first burger with cheese to have a property of 'double cheese'

db.burgers.updateOne( {cheese: 'yes'}, { $set: {cheese: 'double cheese'}})

// find the burger you updated to have double cheese

db.burgers.find( {cheese: 'double cheese'} )

// find and update all the beef burgers to be 'veggie'

db.burgers.updateMany( {type: 'beef'}, { $set: {type: 'veggie'}})

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})

db.burgers.deleteOne( { name: 'Enoki Doki' } )

// drop the collection
//Expected Output
//true

db.burgers.drop()

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }

use burgers
db.dropDatabase()

//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database

// Change the name of the key cheese to 'pumpkinSpice'

db.burgers.updateMany( {}, { $rename: { 'cheese' : 'pumpkinSpice' } } )

// find all the burgers with ketchup (or another topping you used at least once)

db.burgers.find({ toppings: /mustard/i })
    // Because 'mustard' occurred within a string in its key-value array, I looked up how to search for a phrase within a string. source: https://stackoverflow.com/questions/10242501/how-to-find-a-substring-in-a-field-in-mongodb

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles

db.burgers.find({ toppings: /pickles/i })
db.burgers.replaceOne( { name: 'Baby You Can Chive My Car' }, { name: 'Baby You Can Chive My Car', type: 'beef', toppings: 'sour cream & mustard spread, chives', vegan: 'no', cheese: 'no' } )
    // I wasn't sure how to do this in a single line. Google was more confusing than helpful.

// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact

db.burgers.updateMany( { type: 'beef' }, { $push: { toppings: 'eggs' } } )

//Add a price to each burger, start with $5.00 for each burger 

db.burgers.updateMany( {}, { $set: { price: '$5.00' } } )