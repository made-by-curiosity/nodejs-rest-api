const express = require('express');

const { validation, ctrlWrapper, isValidId, auth } = require('../../middlewares');
const { contactSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(contactSchema.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  auth,
  isValidId,
  validation(contactSchema.updateSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validation(contactSchema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
