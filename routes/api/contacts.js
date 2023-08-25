const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(contactSchema.contactAddSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validation(contactSchema.contactUpdateSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
