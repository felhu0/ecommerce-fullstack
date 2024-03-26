const app = require('./app')
const mongoose = require('mongoose')
const path = require('path')
const express = require('express')

require('dotenv').config()

const PORT = process.env.PORT || 6000
const mongoURI = process.env.MONGO_URI

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.send('Välkommen till min API-server!');
  });
  

app.listen(PORT, () => console.log('server: http://localhost:' + PORT))



mongoose.connect(mongoURI)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err.message))