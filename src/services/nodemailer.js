const nodemailer = require('nodemailer');

let options;

if (process.env.NODE === 'production') {
	options = {
		host: `${process.env.EMAIL_HOST}`,
		port: `${process.env.EMAIL_HOST_PORT}`,
		// secure: `${process.env.EMAIL_HOST_SECURE}`, // true for 465, false for other ports
		auth: {
			user: `${process.env.EMAIL_ID}`,
			pass: `${process.env.EMAIL_PASS}`
		}
	};
} else {
	options = {
		host: `${process.env.EMAIL_HOST}`,
		port: `${process.env.EMAIL_HOST_PORT}`,
		// secure: `${process.env.EMAIL_HOST_SECURE}`, // true for 465, false for other ports
		auth: {
			user: `${process.env.EMAIL_ID}`,
			pass: `${process.env.EMAIL_PASS}`
		}
	};
}

let transporter = nodemailer.createTransport(options);

module.exports = transporter;
