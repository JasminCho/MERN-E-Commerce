// stores the cart of user

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema);