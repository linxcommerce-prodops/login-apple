const express = require("express");
const routes = express.Router();

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
//routes.use(bodyParser.json()); // support json encoded bodies
routes.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

routes.get('/', function (req, res) {
	res.render('partials/wrapper', {});
});

routes.get('/auth', function (req, res) {
	res.json('ok')
});

routes.post('/token', function (req, res) {

	const 
		KEY_ID = 'J5KDU76FL7',
		TEAM_ID = 'SJ6S8X7248',
		CLIENT_ID = 'br.com.dcg.core.liquid.apple',
		PRIVATEKEY = 'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg6C0k44maw2BzAhuD3+aIuuQ/nrS2TmhqJQ/+eKfeIeWgCgYIKoZIzj0DAQehRANCAAS3d3QzIvPKHCg53zdK1jbXw0aU6Ux+K5QlvApLzqCdM0Fu6YBi713/UWw/zbizXCLYTrYBYCE2hywrSKZCn8wz';

	const getClientSecret = () => {
		const headers = {
			alg: 'ES256',
			kid: KEY_ID
		};
		const timeNow = Math.floor(Date.now() / 1000);
		const claims = {
			iss: TEAM_ID,
			aud: 'https://appleid.apple.com',
			sub: CLIENT_ID,
			iat: timeNow,
			exp: timeNow + 15777000
		};

		const token = jwt.sign(claims, PRIVATEKEY, {
			algorithm: 'ES256',
			header: headers
			// expiresIn: '24h'
		});

		return token;
	};

	const clientSecret = getClientSecret();
	console.log(clientSecret);


});

routes.post('/auth', function (req, res) {
	console.log('body', req.body);

	const axios = require('axios');

	const config = {
		method: 'post',
		url: 'https://liquid.core.dcg.com.br/oauth/apple/callback',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: req.body
	};
	console.log(config);
	
	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
	
	res.json({
		status: true
	});
})

module.exports = routes;