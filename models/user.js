const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const authRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  authSchema: {
    authRegisterSchema,
    authLoginSchema,
    subscriptionUpdateSchema,
    resendVerificationSchema,
  },
};
