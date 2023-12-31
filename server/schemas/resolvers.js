const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_KEY_SERVER);

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};
            if (category) {
              params.category = category;
            }
            if (name) {
              params.name = {
                $regex: name
              };
            }
            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
              const sortByPurchaseDate = (a,b) => {
                return b.purchaseDate - a.purchaseDate;
              }
              user.orders.sort(sortByPurchaseDate);
              return user;
            }
            throw new AuthenticationError('Error: User not logged in.');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                path: 'orders.products',
                populate: 'category'
              });
      
              return user.orders.id(_id);
            }
            throw new AuthenticationError('Error: User not logged in.');
        },
        // Stripe implementation
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                    const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    imgs: [`${url}/imgs/${products[i].img}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    }, 
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('Error: Incorrect credentials.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Error: Incorrect credentials.');
            }
            const token = signToken(user);
            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
              return order;
            }
            throw new AuthenticationError('Error: User not logged in.');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Error: User not logged in.');
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
    }
};

module.exports = resolvers;