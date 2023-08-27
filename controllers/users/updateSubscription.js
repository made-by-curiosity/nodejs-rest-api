const { User } = require('../../models/user');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        result,
      },
    },
  });
};

module.exports = updateSubscription;
