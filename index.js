/**
 * jankydb is a json file "database"
 * it's main purpose is to use as a dev tool for prototyping Node applications
 * without having to worry about doing too much work to set up a database or ORM
 */
const fs = require("fs"); // file system module to perform file operations

/**
 * Create a new database
 * @param {string} dbName - the name of the database
 */
const createDb = (dbName) => {
  const emptyDbSchema = {
    nextAutoId: 1,
    records: [],
  };
  const newDb = JSON.stringify(emptyDbSchema);

  fs.writeFileSync(dbName, newDb, "utf8");
  console.log(`Created new database ${dbName}`);
};

/**
 * Creates a new record in a database
 * @param {string} dbName - the name of the database to insert to
 * @param {object} newCustomObject - the custom object to insert into the database
 */
const createRecord = (dbName, newCustomObject) => {
  const data = readAll(dbName);
  const newRecord = {
    id: data.nextAutoId++,
    createdAt: new Date(),
    updatedAt: new Date(),
    // customObject: newCustomObject,
    ...newCustomObject,
  };
  data.records.push(newRecord);
  const insertRecord = JSON.stringify(data);

  fs.writeFileSync(dbName, insertRecord, "utf8");
  console.log(`New record created: ${JSON.stringify(newRecord)}`);
};

/**
 * Destroys a record in the database
 * @param {string} dbName - the name of the database to insert to
 * @param {*} recordId - the id of the record to be destroyed
 */
const destroyRecord = (dbName, recordId) => {
  const data = readAll(dbName);

  const updatedRecords = data.records.filter((record) => record.id !== recordId);
  data.records = updatedRecords;

  const destroyRecord = JSON.stringify(data);
  fs.writeFileSync(dbName, destroyRecord, 'utf8');

  console.log(`record ${recordId} destroyed`);
}

/**
 * 
 * @param {string} dbName - the name of the database to read from
 * @returns {object} - the full database JSON
 */
const readAll = (dbName) => {
  return JSON.parse(fs.readFileSync(dbName, { encoding: "utf8" }));
};


// CommonJS export
module.exports = {
  createDb,
  createRecord,
  destroyRecord,
  readAll,
}