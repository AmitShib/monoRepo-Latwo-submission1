import { client, check } from "../mongo";
import { logger } from "../logger";

export async function mongoCreateRest(newOrder) {
  const result = await client.db("RestManagerDB").collection("restaurants").insertOne(newOrder);
  logger.info(`new listing created with following id : ${result.insertedId}`);
  return result;
}
export async function findMultRests(field, value) {
  // find multiplay objects by field - return whole object
  const cursor = await client
    .db("RestManagerDB")
    .collection("restaurants")
    .find(check(field, value) ? { [field]: value } : {});
  const result = await cursor.toArray();
  if (result.length > 0) {
    logger.info(`Found listing with the ${field} mention : ${value}`);
    result.forEach(result => {
      logger.info(result);
    });
  } else {
    logger.info(`NOT! Found listing with the ${field} mention : ${value}`);
  }
  return result;
}

export async function mongoUpdateRest(restaurantId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("restaurants")
    .updateOne({ restaurantId }, { $set: { [field]: value } });
  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} documents was/were updated`);
  return result;
}

export async function deleteOneRest(restaurantId) {
  const result = await client
    .db("RestManagerDB")
    .collection("restaurants")
    .deleteOne({ restaurantId });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
