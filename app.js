const express = require('express');
const mongoose = require('mongoose');



const GenereRoute = require('./router/Genere');
const CustomerRoute = require('./router/customer');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/vidly')
.then(()=> console.log('Connected to MongoDB..'))
.catch(err => console.log('Could not connect to MongoDB'));


app.use('/api/generes',GenereRoute);
app.use('/api/customers',CustomerRoute);



const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}`));