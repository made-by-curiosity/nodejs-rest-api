const express = require('express');

const { validation, ctrlWrapper, auth, upload } = require('../../middlewares');
const { authSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/register', validation(authSchema.authRegisterSchema), ctrlWrapper(ctrl.register));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validation(authSchema.resendVerificationSchema),
  ctrlWrapper(ctrl.resendVerificationEmail)
);

router.post('/login', validation(authSchema.authLoginSchema), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));
router.patch(
  '/',
  auth,
  validation(authSchema.subscriptionUpdateSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
