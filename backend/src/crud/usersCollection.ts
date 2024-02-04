// DB op for users table

import { client, check } from "../mongo";
import { logger } from "../logger";

export async function createListing(newListing) {
  const result = await client.db("RestManagerDB").collection("users").insertOne(newListing);
  logger.info(`new listing created with following id : ${result.insertedId}`);
  return result;
}

export async function findMultUsers(restaurantId, field = " ", value = " ") {
  // find multiplay objects by fields - return whole object
  const findCondition = check(field, value) ? { restaurantId, [field]: value } : { restaurantId };
  const cursor = await client.db("RestManagerDB").collection("users").find(findCondition);
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

export async function findListingByName(nameOfListing) {
  // find one object by name - return whole object
  const result = await client.db("RestManagerDB").collection("users").findOne({
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
  const result = await client.db("RestManagerDB").collection("users").findOne({
    userNumber
  });
  if (result) {
    logger.info(`Found a listing in the collection with the number : ${userNumber}`);
  } else {
    logger.info(`Not found listing with the name : ${userNumber}`);
  }
  return result;
}

export async function mongoUpdateUser(restaurantId, id, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("users")
    .updateOne({ restaurantId, userNumber: id }, { $set: { [field]: value } });
  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} documents was/were updated`);
  return result;
}

export async function deleteOneListing(restaurantId, userNumber) {
  const result = await client
    .db("RestManagerDB")
    .collection("users")
    .deleteOne({ restaurantId, userNumber });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}