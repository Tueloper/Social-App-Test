// const Contact = require('./../models/contact');
const { SendContactMessage } = require('./../services/EmailSender');

module.exports = {
	async sendMessage(req, res) {
		try {
			const contact = new Contact(req.body);
			await contact.save();

			//sending mail to the host email
			SendContactMessage(contact);

			res.status(200).send({ contact });
		} catch (e) {
			res.status(404).send(e.message);
		}
	}
};
