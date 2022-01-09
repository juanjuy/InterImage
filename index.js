const express = require('express');
const cors = require('cors');
require('dotenv').config();
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

app.use('/api/images', imagesRouter);

app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});