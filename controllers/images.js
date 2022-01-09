const imagesRouter = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Image = require('../models/image');
const fs = require('fs');
const path = require('path');

imagesRouter.post('/api/images', upload.single('image'), async (req, res) => {
	let obj = {
		data: fs.readFileSync(path.join(`${__dirname}/../${req.file.path}`)),
		contentType: req.file.mimetype
	};

	Image.create(obj, async (err, item) => {
		if (err) {
			console.log(err);
		} else {
			let result = await item.save();
			res.send(result._id.toJSON());
		}
	});
});

imagesRouter.get('/api/images/:id', async (req, res) => {
	const image = await Image.findById(req.params.id);
	if (image) {
		res.json(image);
	} else {
		res.status(404).end();
	}
});

module.exports = imagesRouter;