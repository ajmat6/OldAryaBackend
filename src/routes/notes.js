const express = require('express');
const { adminMiddleware, userMiddleware } = require('../middleware/userMiddleware');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware')
const slugify = require('slugify');
const shortid = require('shortid');
const Notes = require('../models/Notes');

router.post('/notes/add', fetchuser, adminMiddleware, upload.single('notesImage'), async (req, res) => {
    try
    {
        const payload = {
            title: req.body.title,
            slug: `${slugify(req.body.title)}-${shortid.generate()}`,
            notesLink: req.body.link,
        }
    
        if(req.file)
        {
            payload.notesImage = `${req.file.filename}`
        }
    
        // check if the topic already exist:
        const alreadyNotes = await Notes.findOne({title: req.body.title});
    
        if(alreadyNotes) return res.status(400).json({message: "Notes Already Exist"})
    
        const newNotes = await new Notes(payload);
        await newNotes.save();
    
        res.status(200).json(newNotes);
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

router.get('/getnotes', fetchuser, userMiddleware, async (req, res) => {
    try
    {
        const allNotesFrontTopics = await Notes.find({});
        if(allNotesFrontTopics) return res.status(200).json(allNotesFrontTopics);
        else return res.status(400).json({message: "No Notes Topics Found"});
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Some Internal Server Error Occured! Please try again after some times");    
    }
})

module.exports = router;