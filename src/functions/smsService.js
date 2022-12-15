/****************************************************
 * EMAIL NOTIFICATION FUNCTIONS
 * Helper functions related to sending emails
 * Embedded JavaScript templates of emails are located in /views

 * randomStringGenerator: Returns random string for link expiration code
 * emailNotification: Sends email via SMTP
  - verifyEmail: Sends 
  - forgotPassword: Sends password recovery email
****************************************************/
const http = require("https");
const { } = process.env;

export default {
	randomStringGenerator() {
		let text;
		// let possible = "0123456789";
		// for (let i = 0; i < 4; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		text = Math.floor(1000 + Math.random() * 9000);
		return text;
	},

	async smsNotification(user, notifyType) {
		const linkExpirationCode = await exports.default.randomStringGenerator();
		const options = {
			method: "POST",
			hostname: "api.msg91.com",
			port: null,
			path: "/api/v5/flow/",
			headers: {
				"authkey": process.env.AUTH_KEY_MSG91_SMS,
				"content-type": "application/JSON"
			}
		};

		const req = http.request(options, function (res) {
			const chunks = [];
			res.on("data", function (chunk) {
				chunks.push(chunk);
			});
			res.on("end", function () {
				const body = Buffer.concat(chunks);
				console.log(body.toString());
			});
		});
		req.write(`{\n  \"flow_id\": \"${process.env.FLOW_ID_MSG91_SMS}\",\n  \"sender\": \"${process.env.SENDER_MSG91_SMS}\",\n  \"short_url\": \"1\",\n  \"mobiles\": \"${user?.nationality}${user?.mobile}\",\n  \"otp\": \"${linkExpirationCode}\"\n}`);
		req.end();
		return linkExpirationCode;
	},
};
