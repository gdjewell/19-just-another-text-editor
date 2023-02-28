import { openDB } from "idb";

//Please note that the instructor had provided some of the following code to the class.

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  //sets variable to the database.
  const DB_VAR = await openDB("jate", 1);

  // Variable for transaction
  const TX_VAR = DB_VAR.transaction("jate", "readwrite");

  // Variable for the store
  const STORE_VAR = TX_VAR.objectStore("jate");

  // Perform the update
  const request = STORE_VAR.put({ id: 1, value: content });

  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

export const getDb = async () => {
  const DB_VAR = await openDB("jate", 1);

  const TX_VAR = DB_VAR.transaction("jate", "readwrite");

  const STORE_VAR = TX_VAR.objectStore("jate");

  const request = STORE_VAR.get(1);
  const result = await request;
  result
    ? console.log("🚀 - data retrieved from the database", result.value)
    : console.log("🚀 - data not found in the database");
  // Check if a variable is defined and if it is, return it.

  return result?.value;
};

initdb();
