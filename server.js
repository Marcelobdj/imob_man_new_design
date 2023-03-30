'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(cors({
    origin: 'http://206.189.200.26'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'mongodb://206.189.200.26:27017/imob_man';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3001;

const productSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    address: String,
    transaction: {
        selling: Boolean,
        renting: Boolean
    },
    type: {
        house: Boolean,
        land: Boolean
    },
    bedrooms: Number,
    bathrooms: Number,
    m2: Number,
    img: Array,
    price: Number,
    featured: Boolean,
    id: Number
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

// Get all products
app.get('/imob_man/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
app.get('/imob_man/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new product
app.post('/imob_man/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product
app.patch('/imob_man/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete a product
app.delete('/imob_man/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (e) {
        res.status(500).send();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});