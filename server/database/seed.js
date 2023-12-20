const db = require('../config/connection');
const { User, Product, Category } = require('../models');

// open db, drop, seed data
db.once('open', async () => {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // seed categories
    const categories = await Category.insertMany([
        { name: 'T-Shirt' },
        { name: 'Hoodie' },
        { name: 'Dress' },
    ]);

    // seed products
    const products = await Product.insertMany([
        {
            name: 'White T-shirt',
            description: 'Casual white t-shirt for a laid-back look.',
            img: 'img-1.jpg',
            category: categories[0]._id,
            price: 29.99,
            quantity: 500,
        },
        {
            name: 'Graphic Print T-shirt',
            description: 'Make a statement with this bold graphic print t-shirt.',
            img: 'img-2.jpg',
            category: categories[0]._id,
            price: 22.99,
            quantity: 50,
        },
        {
            name: 'Vintage T-shirt',
            description: 'Rock a vintage look with this t-shirt.',
            img: 'img-3.jpg',
            category: categories[0]._id,
            price: 25.99,
            quantity: 30,
        },
        {
            name: 'Cozy Hoodie Sweatshirt',
            description: 'Stay warm and stylish with this cozy hoodie sweatshirt.',
            img: 'img-4.jpg',
            category: categories[1]._id,
            price: 39.99,
            quantity: 500,
        },
        {
            name: 'Classic Black Hoodie',
            description: 'A classic black hoodie that never goes out of style.',
            img: 'img-5.jpg',
            category: categories[1]._id,
            price: 54.99,
            quantity: 100,
        },
        {
            name: 'Warm Fleece Hoodie',
            description: 'Stay warm in style with this fleece-lined hoodie.',
            img: 'img-6.jpg',
            category: categories[1]._id,
            price: 49.99,
            quantity: 100,
        },
        {
            name: 'Floral Sundress',
            description: 'Elegant floral sundress perfect for any occasion.',
            img: 'img-7.jpg',
            category: categories[2]._id,
            price: 49.99,
            quantity: 500,
        },
        {
            name: 'Blue Summer Dress',
            description: 'Light and breezy blue summer dress for hot days.',
            img: 'img-8.jpg',
            category: categories[2]._id,
            price: 44.99,
            quantity: 20,
        },
        {
            name: 'Elegant Red Dress',
            description: 'Turn heads with this elegant red dress.',
            img: 'img-9.jpg',
            category: categories[2]._id,
            price: 59.99,
            quantity: 30,
        },
    ]);

    // seed user with orders
    await User.create({
        username: 'janesmith',
        email: 'jane@email.com',
        password: '12345',
        orders: [
          {
            products: [products[0]._id, products[1]._id, products[5]._id, products[8]._id]
          }
        ]
    });
    
    // seed user without orders
    await User.create({
        username: 'johnsmith',
        email: 'john@email.com',
        password: '54321'
    });

    console.log('Data seeded 🌱 🌱 🌱');
    process.exit();
});