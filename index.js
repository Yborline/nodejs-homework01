// 1. Получить все товары - contactsPath.getAll
// 2. Получить один товаро по id - contactsPath.getById
// 3. Добавить товар - contactsPath.add
// 4. Обновить товар по id - contactsPath.updateById
// 5. Обновить товар по id - contactsPath.removeById
const contactsPath = require("./contacts");
// const { program } = require("commander");
// const yargs = require("yargs");

const argv = require("yargs").argv;

// const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsPath.getAll();
      console.log(contacts);
      break;
    case "get":
      const contact = await contactsPath.getById(id);
      if (!contact) {
        throw new Error(`Contact by id=${id} not found`);
      }
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsPath.getAdd(name, email, phone);
      console.log(newContact);
      break;
    case "updateById":
      const updateContacts = await contactsPath.updateById(id, data);
      if (!updateContacts) {
        throw new Error(`Contact by id=${id} not found`);
      }
      console.log(updateContacts);
      break;
    case "remove":
      const removeContact = await contactsPath.removeById(id);
      if (!removeContact) {
        throw new Error(`Contact by id=${id} not found`);
      }
      console.log(removeContact);
      break;

    default:
      console.log("unknown action");
  }
};

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// console.table(invokeAction(argv));

invokeAction(argv);
