import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  pw: {
    type: String,
    require: true
  }
});

UsersSchema.virtual('userId').get(function() {
  return this._id.toHexString();
});
UsersSchema.set('toJSON', {virtuals: true});

export default mongoose.model("Users", UsersSchema)