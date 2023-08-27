const { Contact } = require('../../models/contact');

const filterNames = ['favorite', 'email', 'name', 'phone'];

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const queryParams = req.query;
  const queryFilterNames = Object.keys(queryParams);

  const filter = queryFilterNames.reduce((acc, param) => {
    if (filterNames.includes(param)) {
      acc = {
        ...acc,
        [param]: queryParams[param],
      };
    }

    return acc;
  }, {});

  const contacts = await Contact.find(
    {
      owner: _id,
      ...filter,
    },
    '-createdAt -updatedAt',
    {
      skip,
      limit: Number(limit),
    }
  ).populate('owner', '_id email subscription');

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
