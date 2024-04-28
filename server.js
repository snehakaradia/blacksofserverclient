const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactModel = require('./models/contactModel');
const contactRoutes = require('./routes/contactRoute');
const path = require('path');

//env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/contact', contactRoutes);

app.post('/contact', async (req, res) => {
    try {
        const { name, email, phoneNumber, message } = req.body;
        const contact = new contactModel({ name, email, phoneNumber, message });
        await contact.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving contact:', error); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});



//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(8080, () => {
    console.log(`Server Running on port ${PORT}`)
})