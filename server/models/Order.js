import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    refNumber: {
        type: String,
        default: function(){
            return Math.random()+' '.substring(2,10)+(Math.random()+' ').substring(2,10);
        }
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;