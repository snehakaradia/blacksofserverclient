

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');


router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log('Fetched contacts:', contacts); 
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
