const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB/connect');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const PageListingRoutes = require('./Routes/PageListingRoute');
const BookingRoute = require('./Routes/BookingRoute');
const UserRoute = require('./Routes/UserRoute');



app.use(cors())
app.use(express.json());
app.use(express.static('./public'));

// test route
app.get('/test', (req, res) => {
    res.send("Hlo I am Test route");
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', PageListingRoutes);
app.use('/api/v1/bookings',BookingRoute);
app.use('/api/v1/users',UserRoute)

const port = 3000 || process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Sever Running at http://localhost:${port}`));
    } catch (error) {
        console.error("Not connected to database:", error);
    }
}

start();
