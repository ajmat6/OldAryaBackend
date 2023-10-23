const express = require('express');
const router = express.Router();
const Items = require('../models/Items');
const { userMiddleware } = require('../middleware/userMiddleware');
const upload = require('../middleware/uploadMiddleware');
const fetchuser = require('../middleware/fetchuser');

router.post('/addItem', fetchuser, userMiddleware, upload.array('itemImages'), async (req, res) => {
    try
    {
        if(req.body)
        {
            const alreadyItem = await Items.findOne({itemName: req.body.itemName})
            if(alreadyItem) return res.status(400).json({message: "Item already reported!"})

            req.body.userId = req.user.id;
            req.body.date = Date.now();
    
            let itemImages = [];
    
            if(req.files.length > 0)
            {
                itemImages = req.files.map((file) => {
                    return {img: file.filename}
                })
            }

            req.body.itemImages = itemImages
    
            const item = await new Items(req.body);
            await item.save();
    
            return res.status(201).json(item);
        }
    
        else return res.status(400).json({message: "Please add required fields"})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.get('/getItems', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        const allItems = await Items.find({});
        if(allItems) return res.status(200).json(allItems);
        else return res.status(400).json({message: "No Items!"});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

module.exports = router;