const mongoose = require('../libs/mongoose');

// uniqueValidator validation is not atomic! unsafe!
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "E-mail should not be empty",
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Email is not correct'
      }
    ],
    unique: "Email already exist"
  },
  jobTitle: {
    type: String,
    required: "Job Title should not be empty",
  },
  location: {
    type: String,
    required: "Location should not be empty",
  },
  industry: {
    type: String,
    required: "Industry should not be empty",
  },
  name: {
    type: String,
    required: "User should have name",
    unique: "Name already exist"
  }
}, {
  timestamps: true,
  /* @see mongoose
  toObject: {
    transform(doc, ret) {
      // remove the __v of every document before returning the result
      delete ret.__v;
      return ret;
    }
  }*/
});

userSchema.statics.publicFields = ['email', 'name', 'createdAt', 'industry', 'location', 'jobTitle'];

module.exports = mongoose.model('User', userSchema);
