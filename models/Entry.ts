import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry { }

const entrySchema = new Schema({
  description: { type: String, required: true },
  createAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE}, No es permitido. '
    },
    default: 'pending'
  }
});
entrySchema.methods.toJSON = function () {
  const { __v, ...object } = this.toObject();
  return object;
};

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;