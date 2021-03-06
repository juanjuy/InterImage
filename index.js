const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const imagesRouter = require('./controllers/images');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(middleware.requestLogger);

app.use('/', imagesRouter);

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});