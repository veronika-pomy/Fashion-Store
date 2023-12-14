const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const Order = require('./Order');

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must use a valid email address.'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    orders: [Order.schema]
  });

  // create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
});

// validate password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;