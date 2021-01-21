const sharp = require('sharp');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const path = require('path');
// const dUri = new Datauri();
require('./cloudinary_setup');

async function cloudinaryImage(image) {
	const buffer = await sharp(image.buffer)
		.resize({
			width: 300,
			height: 300
		})
		.png()
		.toBuffer();

	const dataUri = dUri.format(path.extname(image.originalname).toString(), buffer);
	const imageFile = dataUri.content;

	const imageUrl = await cloudinary.v2.uploader.upload(imageFile);

	return imageUrl;
}

async function destroyCloudinaryImage(image, id) {
	await cloudinary.v2.uploader.destroy(id, (err, result) => {
		if (err) console.log(err);
		else console.log(result);
	});

	const buffer = await sharp(image.buffer)
		.resize({
			width: 300,
			height: 300
		})
		.png()
		.toBuffer();

	const dataUri = dUri.format(path.extname(image.originalname).toString(), buffer);
	const imageFile = dataUri.content;

	const imageUrl = await cloudinary.v2.uploader.upload(imageFile);

	return imageUrl;
}

module.exports = {
	cloudinaryImage,
	destroyCloudinaryImage
};
