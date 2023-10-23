const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    itemName: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    itemType: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },

    question: {
        type: String,
        required: true,
        trim: true
    },

    itemStatus: {
        type: String,
        enum: ['reported', 'claimed', 'recovered'],
        default: 'reported',
    },

    date: {
        type: Date,
        requied: true
    },

    itemImages: [
        {img: {type: String}}
    ]
}, {timestamps: true})

module.exports = mongoose.model('Item', ItemSchema)