const welcomeMessage = (request, response) => {
	response.status(200).send('Welcome to Social_App-backend');
};

module.exports = welcomeMessage;
