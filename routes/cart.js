// get cart items, add item to cart, delete items from cart

const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

// GET request fetches all items in cart of user
router.get('/cart/:id', cartController.get_cart_items);
// POST request adds item to cart
router.post('/cart/:id', cartController.add_cart_item);
// DELETE request removes item from cart
router.delete('/cart/:userId/:itemId', cartController.delete_item);

module.exports = router;