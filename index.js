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
 * Reads the database
 * @param {string} dbName - the name of the database to read
 * @returns {object} JSON object with all of the db file's contents
 */
const readDb = (dbName) => {
  return dbJSON = JSON.parse(fs.readFileSync(dbName, { encoding: "utf8" }));
};

/**
 * Gets all the records from the database
 * @param {string} dbName - the name of the database to read from
 * @returns {array} - all the records in the database
 */
const selectStar = (dbName) => {
  const { records } = readDb(dbName);
  return records;
};

/**
 * Gets a record by id
 * @param {string} dbName - the name of the database to select from
 * @param {number} id - the id of the record to get
 */
const getRecordById = (dbName, id) => {
  const { records } = readDb(dbName);
  return records.filter((record) => record.id === id)[0];
}

/**
 * Creates a new record in a database
 * @param {string} dbName - the name of the database to insert to
 * @param {object} newCustomObject - the custom object to insert into the database
 */
const insertRecord = (dbName, newCustomObject) => {
  const data = readDb(dbName);
  const newRecord = {
    id: data.nextAutoId++,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...newCustomObject,
  };
  data.records.push(newRecord);
  const updatedDB = JSON.stringify(data);

  fs.writeFileSync(dbName, updatedDB, "utf8");
  console.log(`New record created: ${JSON.stringify(newRecord)}`);
};

/**
 * Destroys a record in the database
 * @param {string} dbName - the name of the database to insert to
 * @param {*} recordId - the id of the record to be destroyed
 */
const destroyRecord = (dbName, recordId) => {
  const data = readDb(dbName);

  const updatedRecords = data.records.filter((record) => record.id !== recordId);
  data.records = updatedRecords;

  const destroyRecord = JSON.stringify(data);
  fs.writeFileSync(dbName, destroyRecord, 'utf8');

  console.log(`record ${recordId} destroyed`);
}


// CommonJS export
module.exports = {
  createDb,
  insertRecord,
  destroyRecord,
  selectStar,
  getRecordById,
}