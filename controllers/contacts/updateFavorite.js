const { Contact } = require('../../models/contact');
const { NotFound } = require('http-errors');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: _id,
    },
    req.body,
    { new: true }
  ).populate('owner', '_id email subscription');

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
