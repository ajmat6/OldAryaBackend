const express = require('express');
const mongoose = require('mongoose');
const app = express();
const env = require('dotenv');
const cors = require('cors');

env.config();

// Routes import:
const userRoutes = require('./routes/auth');

mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.kfhqqjb.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
)
.then(() => {
    console.log("Database Connected");
})

app.use(express.json());
app.use(cors());

app.use('/oldarya', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})