import mongoose from "mongoose";
import { cartSchema, orderHistorySchema, userSchema } from "./schema";

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
const Cart = mongoose.models.Cart ?? mongoose.model("Cart", cartSchema);
const OrderHistory =
  mongoose.models.OrderHistory ??
  mongoose.model("OrderHistory", orderHistorySchema);

export { Cart, OrderHistory, User };
