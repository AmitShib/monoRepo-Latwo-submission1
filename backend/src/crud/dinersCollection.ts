// DB op for users table

import { client, check } from "../mongo.js";
import { logger } from "../logger.js";

// Function to insert a new document (listing) into the "users" collection
export async function createListing(newListing) {
  const result = await client.db("Latwo_DB").collection("diners").insertOne(newListing);
  logger.info(`new listing created with following id : ${result.insertedId}`);
  return result;
}

// Function to find multiple documents in the "users" collection that match a given property
export async function findMultUsers(userID, field = " ", value = " ") {
  // find multiplay objects by fields - return whole object
  const findCondition = check(field, value) ? { userID, [field]: value } : { userID };
  const cursor = await client.db("Latwo_DB").collection("diners").find(findCondition);
  const result = await cursor.toArray();
  if (result.length > 0) {
    if (field === " ") {
      logger.info(`All objects are returned`);
    } else {
      logger.info(`Found listing with the ${field} mention : ${value}`);
      result.forEach(result => {
        logger.info(result);
      });
    }
  } else {
    logger.info(`NOT! Found listing with the ${field} mention : ${value}`);
  }
  return result;
}

// Function to find a single document in the "users" collection based on the name
export async function findListingByName(nameOfListing) {
  // find one object by name - return whole object
  const result = await client.db("Latwo_DB").collection("diners").findOne({
    name: nameOfListing
  });
  if (result) {
    logger.info(`Found a listing in the collection with the name : ${nameOfListing}`);
    logger.info(result);
  } else {
    logger.info(`Not found listing with the name : ${nameOfListing}`);
  }
  return result;
}

export async function findListingByNumber(userNumber) {
  // find one object by name - return whole object
  const result = await client.db("Latwo_DB").collection("diners").findOne({
    userNumber
  });
  if (result) {
    logger.info(`Found a listing in the collection with the number : ${userNumber}`);
  } else {
    logger.info(`Not found listing with the name : ${userNumber}`);
  }
  return result;
}

// Function to find documents by a specific field value
export async function findUsersByField(field, value) {
  const findCondition = { [field]: value };
  const cursor = await client.db("Latwo_DB").collection("diners").find(findCondition);
  const result = await cursor.toArray();

  if (result.length > 0) {
    logger.info(`Found ${result.length} listing(s) with ${field}: ${value}`);
    result.forEach(item => {
      logger.info(item);
    });
  } else {
    logger.info(`No listings found with ${field}: ${value}`);
  }

  return result;
}

// Function to update a document in the "users" collection based on the name
export async function mongoUpdateUser(userID, id, field, value) {
  const result = await client
    .db("Latwo_DB")
    .collection("diners")
    .updateOne({ userID, userNumber: id }, { $set: { [field]: value } });
  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} documents was/were updated`);
  return result;
}

// Function to update a specific field in a document based on a search field and its value
export async function updateUserFieldBySearchField(
  searchField,
  searchValue,
  fieldToUpdate,
  newValue
) {
  const filter = { [searchField]: searchValue };
  const update = { $set: { [fieldToUpdate]: newValue } };

  const result = await client.db("Latwo_DB").collection("diners").updateOne(filter, update);

  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} document(s) was/were updated`);

  return result;
}

// Function to delete a document from the "users" collection based on the id
export async function deleteOneListing(userID, userNumber) {
  const result = await client.db("Latwo_DB").collection("diners").deleteOne({ userID, userNumber });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}

// Function to delete a specific field in a document based on a search field and its value
export async function deleteFieldBySearchField(searchField, searchValue, fieldToDelete) {
  const filter = { [searchField]: searchValue };
  const update = { $unset: { [fieldToDelete]: "" } }; // Use an empty string to unset the field

  const result = await client.db("Latwo_DB").collection("diners").updateOne(filter, update);

  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} document(s) was/were updated`);

  return result;
}

// Function to delete documents based on a search field and its value
export async function deleteDocumentsBySearchField(searchField, searchValue) {
  const filter = { [searchField]: searchValue };

  const result = await client.db("Latwo_DB").collection("diners").deleteMany(filter);

  logger.info(`${result.deletedCount} document(s) were deleted`);

  return result;
}
