const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const reservationRouter = require('./routes/reservation');
const guestRouter = require('./routes/guest');
const roomRouter = require('./routes/room');

app.use('/', reservationRouter);
app.use('/', guestRouter);
app.use('/', roomRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`App is listening on PORT:${PORT}`)})