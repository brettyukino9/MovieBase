const express = require('express');
const tokenParse = require('cookie-parser');
const userRouter = require('./userRoutes');
const listRouter = require('./listRoutes');
const searchRouter = require('./searchRoutes');
const mediaRouter = require('./mediaRoutes');
const reviewRouter = require('./reviewRoutes');

const api = express.Router('/api');
api.use(express.urlencoded({extended: true}));
api.use(tokenParse());
api.use(express.json());
api.use("/users",userRouter);
api.use("/lists",listRouter);
api.use("/search",searchRouter);
api.use("/media",mediaRouter);
api.use("/review",reviewRouter);



module.exports = api;
