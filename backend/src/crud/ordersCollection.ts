//DB op for orders table

import { client, check } from "../mongo";
import { logger } from "../logger";

export async function mongoCreateOrder(newOrder) {
  const result = await client.db("RestManagerDB").collection("orders").insertOne(newOrder);
  logger.info(`new listing created with following id : ${result.insertedId}`);
  return result;
}
export async function findMultOrders(restaurantId, collection, field, value) {
  // find multiplay objects by field - return whole object
  const findCondition = check(field, value) ? { restaurantId, [field]: value } : { restaurantId };
  const cursor = await client.db("RestManagerDB").collection(collection).find(findCondition);
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

export async function mongoUpdateOrder(restaurantId, order_ID, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("orders")
    .updateOne({ restaurantId, order_ID }, { $set: { [field]: value } });
  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} documents was/were updated`);
  return result;
}

export async function deleteOneOrder(restaurantId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("orders")
    .deleteOne({ restaurantId, [field]: value });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
export async function deleteManyOrders(restaurantId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("orders")
    .deleteMany({ restaurantId, [field]: value });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
export async function deleteOneOrderByNumber(order_ID) {
  const result = await client.db("RestManagerDB").collection("orders").deleteOne({ order_ID });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
