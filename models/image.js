var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	data: Buffer,
	contentType: String
});


module.exports = new mongoose.model('Image', imageSchema);