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

const createDb = (dbName) => {
  const emptyDbSchema = { records: [] };
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

//* individual operations */
// create a new record
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

const testy = readAll("./test-database.json");
console.log(testy);

// update many or all records
// delete many or all records

// createDb("test-database");

// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//
//     }

//     console.log("JSON file has been saved.");
// });

const testData = {
  animal: "baby monkey",
  hair: "orange",
  favoriteFoods: ["bananas", "oranges"],
  age: 1,
};

const testJSON = JSON.stringify(testData);
// console.log(testJSON)
