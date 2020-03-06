const rTracer = require("cls-rtracer");
const logger = require("./logger");

const cats = [
  {
    name: "Toonces",
    type: "Domestic Shorthair",
    color: "orange"
  },
  {
    name: "Cheddar",
    type: "tabby",
    color: "orange"
  },
  {
    name: "Oreo",
    type: "shorthair",
    color: "black and white"
  },
  {
    name: "Midnight",
    type: "shorthair",
    color: "black"
  },
  {
    name: "Smokes",
    type: "british blue",
    color: "grey"
  }
];

getAllCats = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cats);
    }, 100);
  });
};

getCatByName = name => {
  logger.info(`Looking for a cat named ${name}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = cats.find(cat => cat.name === name);
      if (found) {
        logger.info(`Found the cat ${JSON.stringify(found)}`);
        resolve(found);
      } else {
        reject(new Error(`No cat is named ${name}. Request: ${rTracer.id()}`));
      }
    }, 100);
  });
};

module.exports = {
  getAllCats,
  getCatByName
};
