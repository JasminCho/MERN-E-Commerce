// Get all orders and Place order (checkout)

const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();

// GET request fetches all orders made till now for user
router.get('/order/:id', orderController.get_orders);
// POST requesetee creates new order
// payments handled by this route
router.post('/order/:id/', orderController.checkout);

module.exports = router;