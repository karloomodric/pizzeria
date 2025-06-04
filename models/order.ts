import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
{
name: { type: String, required: true },
address: { type: String, required: true },
postcode: { type: String, required: true },
total: { type: Number, required: true },
cart: [
{
id: Number,
name: String,
description: String,
price: Number,
quantity: Number,
image: String,
},
],
},
{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
