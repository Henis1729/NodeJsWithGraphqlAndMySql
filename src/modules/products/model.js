import { schema, model } from "mongoose";
const schema = new Schema({
  name: String,
  price: Number,
  desc: String,
  reviews: [
    {
      type: Schema.types.ObjectID,
      ref: "Review",
    },
  ],
});
export const ProductModel = model("product", schema, "product");
