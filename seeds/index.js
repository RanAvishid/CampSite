const mongoose = require('mongoose');
const cities = require ('./cities');
const {places,descriptors} = require ('./seedHelper');
const Campground = require('../moudles/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground ({
            //YOUR USER ID
            author: '6789528e86b75e697a6efa9e',
            location: `${cities[random1000].city} , ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione veritatis rem beatae nesciunt dolorum odio error nostrum voluptas quasi maxime. Reprehenderit recusandae placeat aperiam vitae dolor iure illum voluptatibus nihil.',
            price,
            geometry:{
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
                
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmbptxtix/image/upload/v1738087584/YelpCamp/qb3apyz4b2brc9uqv4pj.jpg',
                  filename: 'YelpCamp/qb3apyz4b2brc9uqv4pj',
                },
                {
                  url: 'https://res.cloudinary.com/dmbptxtix/image/upload/v1738087584/YelpCamp/alqvmzroinqblvppislr.jpg',
                  filename: 'YelpCamp/alqvmzroinqblvppislr',
                },
              ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})