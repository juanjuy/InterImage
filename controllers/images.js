const imagesRouter = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Image = require('../models/image');
const fs = require('fs');
const path = require('path');

imagesRouter.post('/', upload.single('image'), async (req, res) => {
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
// first of all, how do we get the link that we need, and second of all, how do we get that link to properly show the image?
// i'm thinking that we navigate it back to the frontend page, but how do we pass it the json information?
imagesRouter.get('/:id', async (req, res) => {
	const image = await Image.findById(req.params.id);
	if (image) {
		res.json(image);
	} else {
		res.status(404).end();
	}
});

module.exports = imagesRouter;