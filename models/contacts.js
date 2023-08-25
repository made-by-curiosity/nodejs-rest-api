const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(result);

  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);

  return result;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const contactIdx = allContacts.findIndex(contact => contact.id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  const deletedContact = allContacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return deletedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id: v4(),
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contactIdx = allContacts.findIndex(contact => contact.id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  allContacts[contactIdx] = { ...allContacts[contactIdx], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return allContacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
