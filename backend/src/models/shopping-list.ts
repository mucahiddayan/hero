import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IShoppingList extends Document {
    name: string;
    items: Types.ObjectId[];
}

const ShoppingListSchema: Schema = new Schema({
    name: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'ShoppingItem' }]
});

export const ShoppingList = mongoose.model<IShoppingList>('ShoppingList', ShoppingListSchema);
