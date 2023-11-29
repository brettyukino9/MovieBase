const express = require('express');
const tokenParse = require('cookie-parser');
const userRouter = require('./userRoutes');

const api = express.Router();
api.use(express.urlencoded({extended: true}));
api.use(tokenParse());
api.use(express.json());
api.use(userRouter);

module.exports = api;
