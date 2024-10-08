const express = require('express');
const connectDB = require('./config/db');
const note = require('./routes/noteRoute');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



app.use(express.json());
app.use('/' , note);





app.listen(PORT, async ()=>{
try {
    await connectDB();
    console.log(`server is listening on PORT ${PORT}`);
} catch (error) {
    console.log('Error in connecting db' , error)
}
});
