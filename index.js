/**
 * jankydb needs to create a json file (check)
 *
 * it needs to be able to complete crud operations on the json file,
 * for the objects contained within it (in progress...)
 *
 * it needs auto-incrementing id (check)
 *
 * it needs createdAt and updatedAt dates set (check)
 * 
 * maybe i should group nextautoID in a metadata object about the db itself...
 * to keep it seperated from the 'columns'
 * 
 * how can i flatten out the object schema so the 'columns' sit as siblings?
 * 
 * should i transform this thing into an object? probably...
 * i need to think about how to export this thing to be used in other applications
 * 
 * i'm using synchronous filesystem functions, but should i create asyncronous versions? 
 * 
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
    customObject: newCustomObject,
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

/**
 * TESTING
 */
const babyMonkey = {
  animal: "baby monkey",
  hair: "orange",
  favoriteFoods: ["bananas", "oranges"],
  age: 1,
};

const babyCow = {
  animal: "baby cow",
  hair: "spots",
  favoriteFoods: ["grass", "cud"],
  age: 1.5,
};

const babyParsnip = {
  skin: 'juicy',
  plant: 'root',
  quote: 'i am groot!',
}

const myNewObject = {
  myString: 'dookie',
  myNumber: 22,
  myBoolean: true,
};


// createDb("test-database.json");
// createRecord("./test-database.json", babyMonkey);
// createRecord("./test-database.json", babyCow);
// createRecord("./test-database.json", babyParsnip);
destroyRecord('./test-database.json', 2);