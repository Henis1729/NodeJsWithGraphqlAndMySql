/****************************************************
 * EMAIL NOTIFICATION FUNCTIONS
 * Helper functions related to sending emails
 * Embedded JavaScript templates of emails are located in /views

 * randomStringGenerator: Returns random string for link expiration code
 * emailNotification: Sends email via SMTP
  - verifyEmail: Sends 
  - forgotPassword: Sends password recovery email
****************************************************/
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
const { WEB_URL, EMAIL_FROM, SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, SMTP_PORT } = process.env;

export default {
	randomStringGenerator() {
		let text;
		// let possible = "0123456789";
		// for (let i = 0; i < 4; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		text = Math.floor(1000 + Math.random() * 9000);
		return text;
	},
	randomCouponCodeGenerator() {
		let text = "CPN";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for (let i = 0; i < 6; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		// text = Math.floor(1000 + Math.random() * 9000);
		return text;
	},

	async emailNotification(user, notifyType, requestUser) {
		let couponCode = await exports.default.randomCouponCodeGenerator();
		const linkExpirationCode = await exports.default.randomStringGenerator();
		const transporter = await nodemailer.createTransport({
			host: SMTP_HOST,
			secure: false,
			port: SMTP_PORT,
			auth: {
				user: SMTP_USERNAME,
				pass: SMTP_PASSWORD,
			},
		});
		let _id, email;
		if (notifyType === "MongoConnection") {
			email = process.env.MONGOCONNECTIONEMAIL;
		} else {
			_id = user._id;
			email = user.email;
		}

		const mailOptions = {
			from: EMAIL_FROM,
			to: email,
		};

		if (notifyType === "verifyEmail") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `Please verify you mail Id by just clicking here https://admin.myfitnessworld.in/verify-email/${_id}_${linkExpirationCode}`, firstName: "admin", EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					if (err) console.log("Error :", err);
					mailOptions["subject"] = `Verification Of Mail`;
					mailOptions["html"] = data;
				}
			);
		}

		if (notifyType === "MongoConnection") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `MongoDB error connection and error is  ${user}`, firstName: "admin", EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					if (err) console.log("Error :", err);
					mailOptions["subject"] = `MongoDB connection error `;
					mailOptions["html"] = data;
				}
			);
		}

		if (notifyType === "sendCode") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `your Coupon Code is ${couponCode}`, firstName: user.firstName, EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					if (err) console.log("Error :", err);
					mailOptions["subject"] = `Coupon Code Of ${user.coupon} `;
					mailOptions["html"] = data;
				}
			);
		}


		if (notifyType === "forgotPassword") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `your forgot password link is ${WEB_URL}reset-password/${_id}_${linkExpirationCode}`, firstName: user.firstName, EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					mailOptions["subject"] = "Notification";
					mailOptions["html"] = data;
				}
			);
		}

		if (notifyType === "forgotPasswordOfUser") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `Your otp is ${linkExpirationCode} `, firstName: user.firstName, EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					mailOptions["subject"] = "OTP of Forgot password";
					mailOptions["html"] = data;
				}
			);
		}

		if (notifyType === "resetPassword") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/emailVerification.ejs",
				{ message: `Your otp is ${linkExpirationCode} `, firstName: user.firstName, EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					mailOptions["subject"] = "OTP of Reset password";
					mailOptions["html"] = data;
				}
			);
		}

		if (notifyType === "InviteFriend") {
			ejs.renderFile(
				path.join(__dirname, "../views") + "/inviteFriend.ejs",
				{ message: ``, firstName: user.firstName, EMAIL_FROM: process.env.EMAIL_FROM },
				(err, data) => {
					mailOptions["subject"] = `${requestUser.firstName + " " + requestUser.lastName} invited you to a MyFitnessWorld`;
					mailOptions["html"] = data;
				}
			);
		}



		const nodeMailOrResponse = await transporter.sendMail(mailOptions);
		if (nodeMailOrResponse) {
			return {
				flag: true,
				data: linkExpirationCode,
				message: nodeMailOrResponse.response,
				code: couponCode,
			};
		}
		return { flag: false };
	},
};
