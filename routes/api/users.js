const express = require('express');

const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { authSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/register', validation(authSchema.authRegisterSchema), ctrlWrapper(ctrl.register));
router.post('/login', validation(authSchema.authLoginSchema), ctrlWrapper(ctrl.login));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch(
  '/',
  auth,
  validation(authSchema.subscriptionUpdateSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
