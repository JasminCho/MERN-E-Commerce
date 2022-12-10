// handles item logic, add, get, delete, modify

const Item = require('../models/Item');

// Get all items and sort in dec order by date added.
module.exports.get_items = (req, res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}

// save item in db and send new item as response in JSON
module.exports.post_item = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
}

// update item with req info and item id
module.exports.update_item = (req, res) => {
    Item.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function(item) {
            Item.findOne({_id: req.params.id}).then(function(item) {
                res.json(item);
            });
        });
}

// delete item from db with item id
module.exports.delete_item = (req, res) => {
    Item.findByIdAndDelete({_id: req.params.id})
        .then(function(item){
            res.json({success: true});
        });
}

