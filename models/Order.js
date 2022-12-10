// Consists of all orders made by users
// Once user checks out and makes payment all cart items convert into an order and the cart is emptied

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    // unique user id; owner of the cart
    userId: {
        type: String,
    },
    // contains items added to the cart
    items: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less than 1'],
            default: 1
        },
        price: Number
    }],
    // Total cost of cart
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);