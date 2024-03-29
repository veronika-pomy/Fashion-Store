const db = require('../config/connection');
const { User, Product, Category } = require('../models');

// open db, drop, seed data
db.once('open', async () => {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // seed categories
    const categories = await Category.insertMany([
        { name: 'Dresses' },
        { name: 'Jackets' },
        { name: 'Shirts' },
    ]);

    // seed products
    const products = await Product.insertMany([
        {
            name: 'Modern Flapper Dress',
            description: 'Embrace the Roaring Twenties with timeless flair in our modern flapper dress, blending vintage allure with contemporary sophistication.',
            image: 'image-1.jpg',
            category: categories[0]._id,
            price: 180.99,
            quantity: 20,
        },
        {
            name: 'Sheer Structured Pants Ansambel',
            description: 'Elevate your ensemble with structured elegance and airy grace in our tailored pants paired with a sheer, flowy top, exuding modern sophistication with every step.',
            image: 'image-2.jpg',
            category: categories[0]._id,
            price: 220.99,
            quantity: 10,
        },
        {
            name: 'Sheer Gown',
            description: 'Step into ethereal elegance with our sheer billowing gown, a mesmerizing blend of delicate transparency and voluminous grace, perfect for making a refined statement.',
            image: 'image-3.jpg',
            category: categories[0]._id,
            price: 395.99,
            quantity: 5,
        },
        {
            name: 'Oversized Blazer',
            description: 'Amplify your style with our 80s-themed structured oversized blazer, a fusion of timeless sophistication and retro charm, perfect for those seeking a classic yet distinctive look.',
            image: 'image-4.jpg',
            category: categories[1]._id,
            price: 90.99,
            quantity: 20,
        },
        {
            name: 'Modern Trench Coat',
            description: 'Unwind in style with our modern trench coat, offering a laid-back twist on timeless sophistication, perfect for effortless elegance.',
            image: 'image-5.jpg',
            category: categories[1]._id,
            price: 200.99,
            quantity: 20,
        },
        {
            name: 'Tailored Vest',
            description: 'Ease into sophistication with our tailored vest, a versatile piece that effortlessly blends classic charm with modern refinement, perfect for refined relaxation.',
            image: 'image-6.jpg',
            category: categories[1]._id,
            price: 85.99,
            quantity: 7,
        },
        {
            name: 'Linen Tunic',
            description: 'Indulge in comfort with our linen tunic, a breezy yet refined piece that effortlessly merges relaxed vibes with timeless elegance, perfect for effortless chic.',
            image: 'image-7.jpg',
            category: categories[2]._id,
            price: 79.99,
            quantity: 10,
        },
        {
            name: 'Structured Shirt',
            description: 'Channel work-ready sophistication with our structured shirt, a tailored essential that balances sharp lines with a utilitarian charm, perfect for enhancing your everyday style.',
            image: 'image-8.jpg',
            category: categories[2]._id,
            price: 55.99,
            quantity: 3,
        },
        {
            name: 'Flannel Shirt',
            description: 'Embrace rugged charm with our flannel shirt, a rustic yet stylish staple that exudes outdoor appeal with a touch of classic comfort.',
            image: 'image-9.jpg',
            category: categories[2]._id,
            price: 49.99,
            quantity: 5,
        },
    ]);

    // seed user with orders
    await User.create({
        username: 'janesmith',
        email: 'jane@email.com',
        password: '12345',
        orders: [
          {
            purchaseDate: Date.now(),
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