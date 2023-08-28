const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  console.log('tempUpload', tempUpload);

  await Jimp.read(tempUpload).then(avatar => {
    return avatar.cover(250, 250).write(tempUpload);
  });

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', fileName);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        avatarURL,
      },
    },
  });
};

module.exports = updateAvatar;
