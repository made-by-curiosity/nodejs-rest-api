const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  const { _id } = req.user;

  const newContact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact,
    },
  });
};

module.exports = add;
