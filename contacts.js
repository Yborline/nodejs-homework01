// const contactsPath = require("./db/contacts.json");

// 1. Получить все товары - contactsPath.
// 2. Получить один товаро по id - contactsPath.getById
// 3. Добавить товар - contactsPath.add
// 4. Обновить товар по id - contactsPath.updateById
// 5. Обновить товар по id - contactsPath.removeById

const fs = require("fs").promises;
const updateContacts = require("./updeteContacts");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getById = async (id) => {
  const contacts = await getAll();
  const result = contacts.find((item) => Number(item.id) === id);
  if (!result) {
    return null;
  }
  return result;
};

const getAdd = async (name, email, phone) => {
  const contacts = await getAll();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => Number(item.id) === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeById = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => Number(item.id) === id);
  if (idx === -1) {
    return null;
  }
  // const [removeContact] = contacts.splice(idx, 1);
  // await updateContacts(contacts);
  // return removeContact;
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
};
module.exports = { getAll, getById, getAdd, updateById, removeById };
//
//
// json файлы прогоняют через JSON.parse а не через  кодировку "utf-8"
//
//
// const fs = require("fs").promises;
// const fs = require("fs/promises");

// const fileOperation = async (filePath, action = "read", data = "") => {
//   switch (action) {
//     case "read":
//       const text = await fs.readFile(filePath, "utf-8");
//       console.log(text);
//       break;
//     case "add":
//       await fs.appendFile(filePath, data);
//       break;
//     case "replace":
//       await fs.writeFile(filePath, data);
//       break;
//     default:
//       return;
//   }
// };

// fileOperation("./db/contacts.json");
// fileOperation("./db/contacts.json", "add", "yarAAAAa");
// fileOperation("./db/contacts.json", "replace", "yarAAAAa");

// fs.readFile("db/contacts.json", "utf-8")
//   .then((data) => {
//     console.log(data);
//     // const text = data.toString();
//     // console.log(text);
//   })
//   .catch((error) => console.log(error.message));
