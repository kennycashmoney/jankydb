/**
 * jankydb needs to create a json file (check)
 *
 * it needs to be able to complete crud operations on the json file,
 * for the objects contained within it (in progress...)
 *
 * it needs auto-incrementing id
 *
 * it needs createdAt and updatedAt dates set
 */

const fs = require("fs"); // file system module to perform file operations

const createDb = (dbName, autoIncrement=true) => {
  const emptyDbSchema = { records: [] };
  if (autoIncrement) emptyDbSchema.nextAutoId = 1;
  fs.writeFile(
    `${dbName}.json`,
    JSON.stringify(emptyDbSchema),
    { encoding: "utf8" },
    (error) => {
      if (error) {
        console.log("An error occured while writing creating db");
        return console.log(error);
      } else {
        console.log("created db!");
      }
    }
  );
};

const dbSchemaExample = {
  records: [
    {
      id: 1,
      createdAt: "2023-09-17T22:56:57.475Z",
      updatedAt: "2023-09-17T22:56:57.475Z",
      customObject: {},
    },
    {
      id: 2,
      createdAt: "2023-09-17T22:56:57.475Z",
      updatedAt: "2023-09-17T22:56:57.475Z",
      customObject: {},
    },
    {
      id: 3,
      createdAt: "2023-09-17T22:56:57.475Z",
      updatedAt: "2023-09-17T22:56:57.475Z",
      customObject: {},
    },
  ],
};

const babyMonkey = {
  animal: "baby monkey",
  hair: "orange",
  favoriteFoods: ["bananas", "oranges"],
  age: 1,
};


//* individual operations */
// create a new record
const createRecord = (dbName, newCustomObject) => {
  const db = readAll(dbName);
  const data = JSON.parse(db);
  const newRecord = {
    id: data.nextAutoId++,
    createdAt: new Date(),
    updatedAt: new Date(),
    customObject: newCustomObject
  };
  data.records.push(newRecord);
  console.log(JSON.stringify(data));

  fs.writeFile(
    dbName,
    JSON.stringify(data),
    { encoding: "utf8" },
    (error) => {
      if (error) {
        console.log("An error occured while writing adding record");
        return console.log(error);
      } else {
        console.log("added record!");
      }
    }
  );

}
// read a record - args: the id of the record, or just get all...
// const readRecord()
// update a record
// delete a record

//* bulk operations */
// create many new records
// read many or all records
const readAll = (dbName) => {
  return fs.readFileSync(dbName, { encoding: "utf8" });
};

createRecord("./test-database.json", babyMonkey);

// update many or all records
// delete many or all records

// createDb("test-database");

// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//
//     }

//     console.log("JSON file has been saved.");
// });

