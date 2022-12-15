import cron from "node-cron";
import { sendNotification, prepareDataUserMr1 } from "./common";
import moment from "moment";
import models from "../models/index";
import { prepareDataUserMr } from "../resolvers/userIntake";
import async from "async";
import mongoose from "mongoose";
import _ from "lodash";

/******************************* Make a graph of a current day of every user *********************/
const updateMR = async () => {
	const roleUser = await models?.Role.findOne({ roleName: "user", isDeleted: false });
	models?.User?.find({ isDeleted: false, trekMRFlag: true, roleId: roleUser?._id }, { _id: 1 }).exec((err, users) => {
		if (err) reject(err);
		else if (users?.length) {
			async.each(users, async (user, cb) => { await prepareDataUserMr1(models, user?._id, new Date()); if (cb) cb() });
		}
	})
};

/******************************* Make a false subscription for all user whose subscription expired *********************/
const overUserFreeSubscription = async () => {
	const users = await models?.User?.find({ isDeleted: false, isSubscribed: true, createdAt: { $lt: moment(new Date(new Date().getTime() - 7 * (24 * 60 * 60 * 1000))).startOf("day") } }, { _id: 1 });
	async.each(users, async (user, cb) => {
		let userData = await models?.User?.findOne({ _id: mongoose.Types.ObjectId(user?._id), isDeleted: false }, { isSubscribed: 1 });
		let userSubData = await models?.UserSubscription?.findOne({ userId: user?._id, status: "ACTIVE", isDeleted: false }, { status: 1, expiresOn: 1 });
		if (userSubData && new Date(userSubData.expiresOn) < new Date()) {
			console.log("user subscription find")
			userSubData.status = "COMPLETED";
			userSubData?.save();
			userData.isSubscribed = false;
			userData?.save();
		}
		if (!userSubData) {
			console.log("free subscription over")
			userData.isSubscribed = false;
			userData?.save();
		}
		if (cb) cb()
	})
};

/******************************* Send LPM Formula update Notification to User who have not updated last 15 day  *********************/
const sendLPMUpdateNotificationToUser = async () => {
	models?.User?.find({
		isDeleted: false, lpmFormulaLastDate: { $lt: moment(new Date(new Date().getTime() - 15 * (24 * 60 * 60 * 1000))).startOf("day") },
	}, { _id: 1, firebaseToken: 1 }, (err, users) => {
		let newTokens = []
		_.each(users, (user) => { if (user.firebaseToken) newTokens.push(user) })
		let title = "MFW LPM Formula Reminder"
		let message = "Please update your details in LPM formula, you have not updated till last 15 days."
		if (newTokens.length) sendNotification(newTokens, title, message)
	});
};

/******************************* Cron Timings for Make current Day Graph Of user  *********************/
export const cronJob = () => {
	cron.schedule("0 0 0 * * *", () => updateMR());
};

/******************************* Cron Timings for Free Subscription of users  *********************/
export const userFreeSubscriptionCronJob = () => {
	cron.schedule("0 0 0 * * *", () => {
		overUserFreeSubscription();
	});
};

/******************************* Cron Timings for sendNotification  *********************/
export const sendLPMUpdateNotification = () => {
	cron.schedule("0 0 9 * * * *", () => {
		sendLPMUpdateNotificationToUser();
	});
};
