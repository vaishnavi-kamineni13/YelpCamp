const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console,'Connection error:'));
db.once("open", ()=>{
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() *20)+10;
        const camp = new Campground({
            author: '60862b338a08003428647e87',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dpv8cyrw6/image/upload/v1619717706/YelpCamp/obhipkliv2zgjkxczpog.jpg',
                  filename: 'YelpCamp/obhipkliv2zgjkxczpog'
                },
                {
                  url: 'https://res.cloudinary.com/dpv8cyrw6/image/upload/v1619717707/YelpCamp/djc0ylvahc4mh5csjkau.jpg',
                  filename: 'YelpCamp/djc0ylvahc4mh5csjkau'
                }
              ],
            
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nobis repudiandae dolore. Eaque velit earum libero error, non, aliquam modi perspiciatis odit illum ab et quaerat dicta commodi autem amet.',
            price,
            geometry: {
              type:"Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            }

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})