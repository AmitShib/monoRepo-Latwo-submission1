import { client, check } from "../mongo";
import { logger } from "../logger";
import { findMultOrders, mongoUpdateOrder, deleteOneOrder } from "../crud/ordersCollection";
import { findMultTables, mergeFields } from "../crud/tablesCollection";

export const mergeOrders = async (restaurantId, table_id_1, table_id_2) => {
  try {
    const result = await findMultOrders(restaurantId, "orders", "table_Number", table_id_2);
    result.forEach(async ({ order_ID }) => {
      await mongoUpdateOrder(restaurantId, order_ID, "table_Number", table_id_1);
    });
    logger.info(
      `All orders from table id : ${table_id_2} were updated to new table id : ${table_id_1} `
    );
    return result;
  } catch (error) {
    logger.error(error);
  }
};

export const mergeMembers = async (restaurantId, table_id_1, table_id_2) => {
  try {
    const table2Result = await findMultTables(restaurantId, "table_id", table_id_2);
    const membersList = await mergeFields(
      restaurantId,
      table_id_1,
      "members",
      table2Result[0].members
    );
    if (membersList.modifiedCount) {
      logger.info("Update members succsed");
    } else {
      logger.error("Faild Update members");
    }
  } catch (error) {
    logger.error(error);
  }
};
