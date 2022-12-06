let express = require('express');
let mongoose = require('mongoose');
require('dotenv').config()

let userRouter = require('./router/user.router');
let authRouter = require('./router/auth.router');
let configs = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('WELOCME');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect('mongodb://localhost:27017/june2022');
    console.log(`Server listen ${configs.PORT}`);
});
