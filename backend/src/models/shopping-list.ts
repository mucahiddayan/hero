import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IShoppingList extends Document {
  name: string;
  items: Types.ObjectId[];
}

const ShoppingListSchema: Schema = new Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'ShoppingItem' }],
});

export const ShoppingList = mongoose.model<IShoppingList>(
  'ShoppingList',
  ShoppingListSchema,
);

// wenn die liste geloescht wird,
// loesche auch die zugehoerige elemente, da sie nicht mehr benoetigt werden
ShoppingListSchema.pre('findOneAndDelete', async function () {
  const list = await this.model.findOne(this.getFilter());
  if (list) {
    await mongoose.model('ShoppingItem').deleteMany({
      _id: { $in: list.items },
    });
  }
});
