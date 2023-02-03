require('dotenv').config({path: require('find-config')('.env')});
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require(path.join(__dirname, 'presentation', 'middleware', 'errorHandler'));
const { logger, requestLogger, errorLogger } = require(path.join(__dirname, 'common', 'logging', 'index.js'))

app.use(requestLogger);
app.use(errorLogger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

// routes
app.use('/', require(path.join(__dirname, 'presentation', 'routes', 'root')));
app.use('/records', require(path.join(__dirname, 'presentation','routes','records')));

app.use(errorHandler);

const server = app.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}`)
}); 
