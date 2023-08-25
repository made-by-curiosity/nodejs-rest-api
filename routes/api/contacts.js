const express = require('express');

const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
const { contactSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validation(contactSchema.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  isValidId,
  validation(contactSchema.updateSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(contactSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
