import { client, check } from "../mongo";
import { logger } from "../logger";
import { findMultOrders, deleteOneOrder } from "../crud/ordersCollection";

export const updateArrayProp = async (restaurantId, id, dishId, field, value) => {
  try {
    const specipicField = `orders.$.${field}`;
    const query = { restaurantId, order_ID: id, "orders.dishId": dishId };
    const updateDocument = {
      $set: { [specipicField]: value }
    };
    const result = await client
      .db("RestManagerDB")
      .collection("orders")
      .updateOne(query, updateDocument);
    logger.info(`${result.matchedCount} document(s) matched the query criteria`);
    logger.info(`${result.modifiedCount} documents was/were updated`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export async function deleteOneDish(restaurantId, order_ID, dishId) {
  try {
    const result = await client
      .db("RestManagerDB")
      .collection("orders")
      .updateOne({ restaurantId, order_ID }, { $pull: { orders: { dishId } } });
    logger.info(`${result.matchedCount} document(s) matched the query criteria`);
    logger.info(`${result.modifiedCount} documents was/were updated`);
    logger.info(result);
    isOrdersEmpty(restaurantId, order_ID);
    return result;
  } catch (error) {
    logger.error(error);
  }
}

const isOrdersEmpty = async (restaurantId, order_ID) => {
  const result = await findMultOrders(restaurantId, "orders", "order_ID", order_ID);
  if (result[0].orders.length === 0) {
    await deleteOneOrder(restaurantId, "order_ID", order_ID);
    logger.info("Orders array was empty , Order were deleted");
  }
};
