const db = require("../database/dbConfig");

module.exports = {
  add,
  findby
};

function add(body) {
  return db("users").insert(body);
}
function findby(filter) {
  return db("users").where(filter);
}
