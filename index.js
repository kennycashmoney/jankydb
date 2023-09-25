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
  const db = readAll(dbName);
  const data = JSON.parse(db);
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



// TODO: read a record - args: the id of the record, or just get all...
// const readRecord()
// update a record
// delete a record

/**
 * Destroys a record in the database
 * @param {string} dbName - the name of the database to insert to
 * @param {*} recordId - the id of the record to be destroyed
 */
const destroyRecord = (dbName, recordId) => {
  const db = readAll(dbName);
  const data = JSON.parse(db);

  const updatedRecords = data.records.filter((record) => record.id !== recordId);
  data.records = updatedRecords;

  const destroyRecord = JSON.stringify(data);
  fs.writeFileSync(dbName, destroyRecord, 'utf8');

  console.log(`record ${recordId} destroyed`);
}

//* bulk operations */
// create many new records
// read many or all records
const readAll = (dbName) => {
  return fs.readFileSync(dbName, { encoding: "utf8" });
};
// update many or all records
// delete many or all records


// CommonJS export
module.exports = {
  createDb,
  createRecord,
  destroyRecord,
  readAll,
}


/**
 * TODOS:
 * maybe i should group nextautoID in an object about the db itself...
 * to keep it seperated from the 'columns'
 * 
 * how can i flatten out the object schema so the 'columns' sit as siblings?
 * 
 * should i transform this thing into an object? probably...
 * i need to think about how to export this thing to be used in other applications
 * so - do i make this a CommonJS module or an ES Module? - 
 * --if i use typescript, i think it will want ES Module...
 * 
 * i'm using synchronous filesystem functions, but should i create asyncronous versions? 
 */