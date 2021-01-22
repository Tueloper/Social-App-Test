const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routers/index');
const User = require('./routers/user');
const Post = require('./routers/post');
const Like = require('./routers/like');
const chalk = require('chalk');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json()); //Used to parse JSON bodies
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
// app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(cors());

// app.use('/', router);
app.use('/v1.0/api', [ User, Post, Like ]);

mongoose.connect(
	process.env.DATABASE_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	function(err, client) {
		if (err) console.log(err.message);
		if (client) console.log(chalk.green.italic.inverse('Databse Connected Successsful'));
	}
);

const PORT = parseInt(process.env.PORT, '0.0.0.0') || 3000;

app.listen(PORT, () => {
	console.log(chalk.cyan.italic(`Server Started At ${PORT}`));
});

