// Handles add, delete, and get items logic for the cart

const Cart = require('../models/Cart');
const Item = require('../models/Item');

// fetch all items in cart
// Get userId, search for cart with username
module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cartItems.length > 0) {
            res.send(cart);
        } else {
            res.send(null);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

// Adding items to cart
// UserId for cart and productID and quantity for item

module.exports.add_cart_item = async (req, res) => {
    const userId = req.params.id; // get user's cart
    const { productId, quantity } = req.body; // item and quantity

    try {
        let cart = await Cart.findOne({userId}); // userId to access cart for user
        let item = await Item.findOne({_id: productId}); // productId to find item to add to cart
        if (!item) {
            res.status(404).send('Item not found!')
        }
        const price = item.price;
        const name = item.title;

        if (cart) {
            // if cart exists for user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // check if product exists or not
            if (itemIndex > -1) {
                // if item is already in the cart increase quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // if item is not present in the cart, add it
                cart.items.push({ productId, name, quantity, price });
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price }],
                bill: quantity*price
            });
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

// delete items from the cart
module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    
    try {
        let cart = await Cart.findOne({ userId });
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if (itemIndex > -1) {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex, 1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    } 
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}