// Handles getting, adding, updating, and deleting items
const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

// GET fetches all items from server
router.get('/items', itemController.get_items);
// POST adds new item to db
router.post('/items', itemController.post_item);
// PUT updates existing item in db
router.put('/items/:id', itemController.update_item);
// DELETE removes item from db
router.delete('/items/:id', itemController.delete_item);

module.exports = router;