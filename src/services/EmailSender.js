const transporter = require('./nodemailer');
// const process.env = require('./../../config/process.env');

const SendContactMessage = (details) => {
	const { email, subject, content } = details;
	const mailOptions = {
		from: `${email}`,
		to: `${process.env.EMAIL_ID}`,
		subject: `${subject}`,
		text: `${content}`
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

const sendOrderNotification = (user, details) => {
	const { email, phone, full_name } = user;
	const mailOptions = {
		from: `${process.env.EMAIL_ID}`,
		to: `${process.env.EMAIL_ID}`,
		subject: `${full_name} just made an order`,
		text: `
			Check the details of the order below 
			\n\nemail -> ${email}
			\nmoile no -> ${phone}
			\nprice -> ${details.price}
			\npickup -> ${details.location_address}, ${details.location_state}
			\ndestination -> ${details.destination_address}, ${details.destination_state}
			\n This order is to be delivered as soon as possible`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return 'error sending verification';
		}
		console.log(`Email sent: ${info.response}`);
	});
};

const sendUserOrderNotification = (user, details) => {
	const { email, phone } = user;
	const mailOptions = {
		from: `${process.env.EMAIL_ID}`,
		to: `${email}`,
		subject: `SendIt Order Confirmation`,
		text: `
		SendIt has recieved your Order and will process it within the next 7 Working days, Your Order Id is ${details._id}
		\nCheck the details of the order below 
		\n\nemail -> ${email}
		\nmoile no -> ${phone}
		\npickup -> ${details.location_address}, ${details.location_state}
		\ndestination -> ${details.destination_address}, ${details.destination_state}
		\nPrice -> ${details.price}
		\n This order is to be delivered as soon as possible`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return 'error sending verification';
		}
		console.log(`Email sent: ${info.response}`);
	});
};

const sendProcessingNotification = (email, Id) => {
	const mailOptions = {
		from: `${process.env.EMAIL_ID}`,
		to: `${email}`,
		subject: `Order ${Id}, Processing`,
		text: `
		Order ID: ${Id}, has been is enroute your preferred location
		\n Thank you for choosing SendIt`
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

const sendDeliveredNotification = (email, id, name) => {
	const mailOptions = {
		from: `${email}`,
		to: `${process.env.EMAIL_ID}`,
		subject: `${name} Just Confirmed an Order`,
		text: `Order ID: ${id}, is delivered successfully and recieved by the respondent\n SendIt Rocks.`
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

const orderComplete = (id, name) => {
	const mailOptions = {
		from: `${process.env.EMAIL_ID}`,
		to: `${email}`,
		subject: `${name}, Thank You For Using SendIt`,
		text: `Order ID: ${id}, is delivered successfully, We are glad we could be of help delivery this package to You Safely. Do well to use our services more often. we are here just serve you. \n SendIt Rocks.`
	};
	// return console.log(mailOptions);
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error occurred. ' + error.message);
			// return process.exit(1);
		} else {
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		}
	});
};

module.exports = {
	SendContactMessage,
	sendProcessingNotification,
	sendDeliveredNotification,
	sendOrderNotification,
	sendUserOrderNotification,
	orderComplete
};
