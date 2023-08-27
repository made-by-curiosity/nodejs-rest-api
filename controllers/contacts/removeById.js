const { NotFound } = require('http-errors');
const { Contact } = require('../../models/contact');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  }).populate('owner', '_id email subscription');

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  });
};

module.exports = removeById;
