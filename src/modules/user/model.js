import { schema, model } from "mongoose";
const schema = new Schema({
  name: String,
});
export const UserModel = model("user", schema, "user");
