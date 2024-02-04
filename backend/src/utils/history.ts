import { client, check } from "../mongo";
import { logger } from "../logger";
import { findMultOrders, deleteOneOrder, deleteManyOrders } from "../crud/ordersCollection";

export const createNewHistory = async arr => {
  try {
    const result = await client.db("RestManagerDB").collection("history").insertMany(arr);
    console.log(result);
    logger.info(`new listing created with following `);
    return result;
  } catch (error) {
    logger.error(error);
  }
};
export const getPastOrder = async (req, res) => {
  try {
    logger.info("New Get Previus Order Req");
    const response = await findMultOrders(
      req.query.restaurantId,
      "history",
      req.query.field,
      req.query.value
    );
    if (response.length > 0) {
      return res.status(200).json({ message: "Object(s) Read Successfully", response });
    } else {
      return res.status(404).json({ message: "Object(s) Was Not Found" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

type Filter = {
  restaurantId: string;
  time?: string;
  table_Number?: string;
  consumer_Name?: string;
  order_ID?: string;
  date?: string;
};
export async function findHistoryByFilters(filter: Filter) {
  const cursor = await client.db("RestManagerDB").collection("history").find(filter).limit(6);
  const result = await cursor.toArray();
  if (result.length > 0) {
    logger.info(`Found listing with the mentioned props`);
    result.forEach(result => {
      logger.info(result);
    });
  } else {
    logger.info(`NOT! Found listing with the mentioned props`);
  }
  return result;
}

export const getOrderByFilters = async (req, res) => {
  try {
    logger.info("New Get Previus Order Req");
    const response = await findHistoryByFilters(req.query);
    if (response.length > 0) {
      return res.status(200).json({ message: "Object(s) Read Successfully", response });
    } else {
      return res.status(404).json({ message: "Object(s) Was Not Found" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const moveToHistory = async (restaurantId, table_Number) => {
  try {
    logger.info("new Get Req");
    const response = await findMultOrders(restaurantId, "orders", "table_Number", table_Number);
    if (response.length > 0) {
      logger.info("new Delete Req");
      const insertToHistory = await createNewHistory(response);
      const deleteRes = await deleteManyOrders(restaurantId, "table_Number", table_Number);
      if (deleteRes.deletedCount) {
        logger.info("Object(s) Updated Successfully", response);
      } else {
        logger.error("Object(s) Was Not Deleted");
      }
    } else {
      logger.info("Cannot find any Object(s) to Read");
    }
  } catch (error) {
    logger.error(error);
  }
};
