const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value: string) => {
      return validator.isEmail(value)
    }
  },
  nickname: String
});


export const UserModel = mongoose.model('User', userSchema);