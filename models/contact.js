const { Schema, model } = require('mongoose');
const Joi = require('joi');
const handleSchemaValidationErrors = require('../helpers/handleSchemaValidationErrors');

const phonRegExp = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: [true, 'Email must be unique'],
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      match: [phonRegExp, 'Wrong phone number format. Use (000) 000-00-00 format'],
      unique: [true, 'Phone number must be unique'],
      required: [true, 'Phone number is required'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phonRegExp).required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phonRegExp),
  favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    'any.required': 'missing field favorite',
  }),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  contactSchema: { addSchema, updateSchema, updateFavoriteSchema },
};
