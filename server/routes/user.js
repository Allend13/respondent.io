const _ = require('lodash');
const User = require('../models/user');
const mockUsers = require('../fixtures/users');

exports.index = async (ctx, next) => {
  console.log('index');
  const query = _.pickBy(ctx.request.query);
  console.log(query);
  try {
    const response = await User.find(query);
    ctx.body = response.map(item => _.pick(item, User.publicFields));
  } catch (error) {
    ctx.body = error;
  }
};

exports.show = async (ctx, next) => {
  console.log('show');
  try {
    ctx.body = await User.findOne({ _id: ctx.params.id });
  } catch (error) {
    if (error.name === 'CastError') ctx.body = 'User not found';
  }
};

exports.generate = async (ctx, next) => {
  try {
    await User.remove();
    ctx.body = await User.insertMany(mockUsers);
  } catch (error) {
    console.log(error);
    ctx.body = error;
  }
};

exports.post = async (ctx, next) => {
  const user = new User({
    email: ctx.request.body.email.toLowerCase(),
    name: ctx.request.body.name,
    jobTitle: ctx.request.body.jobTitle,
    location: ctx.request.body.location,
    industry: ctx.request.body.industry,
  });
  try {
    ctx.body = await user.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errorMessages = "";
      for (let key in error.errors) {
        errorMessages += `${key}: ${error.errors[key].message}<br>`;
      }
      ctx.body = errorMessages;
    } else {
      ctx.throw(error);
    }
  }
};