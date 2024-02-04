import { client, check } from "../mongo";
import { logger } from "../logger";

export async function mongoCreateMenuDish(newOrder) {
  const result = await client.db("RestManagerDB").collection("menu").insertOne(newOrder);
  logger.info(`new listing created with following id : ${result.insertedId}`);
  return result;
}
export async function findMultOMenuDishes(restaurantId, collection, field, value) {
  const findCondition = check(field, value)
    ? { restaurant_id: restaurantId, [field]: value }
    : { restaurant_id: restaurantId };
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

export async function mongoUpdateMenuDish(restaurantId, menuDishId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("menu")
    .updateOne({ restaurantId, menuDishId }, { $set: { [field]: value } });
  logger.info(`${result.matchedCount} document(s) matched the query criteria`);
  logger.info(`${result.modifiedCount} documents was/were updated`);
  return result;
}

export async function deleteOneMenuDish(restaurantId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("menu")
    .deleteOne({ restaurantId, [field]: value });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
export async function deleteManyMenuDish(restaurantId, field, value) {
  const result = await client
    .db("RestManagerDB")
    .collection("menu")
    .deleteMany({ restaurantId, [field]: value });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
export async function deleteOneMenuDishByNumber(MenuDishId) {
  const result = await client.db("RestManagerDB").collection("menu").deleteOne({ MenuDishId });
  logger.info(`${result.deletedCount} document(s) was/were deleted`);
  return result;
}
