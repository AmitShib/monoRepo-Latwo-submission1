import { logger } from "../logger";
import {
  mongoCreateOrder,
  findMultOrders,
  mongoUpdateOrder,
  deleteOneOrder,
  deleteManyOrders
} from "../crud/ordersCollection";
import { printNewOrder } from "../printer/sendNewReceipt";

export const createOrder = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (
      !req.body.table_Number ||
      !req.body.restaurantId ||
      !req.body.consumer_Name ||
      !req.body.allergies ||
      !req.body.orders
    ) {
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    } else {
      const newOrderObject = {
        date: new Date().toDateString(),
        time: new Date().toISOString(),
        table_Number: req.body.table_Number,
        restaurantId: req.body.restaurantId,
        order_ID: req.body.order_ID,
        consumer_Name: req.body.consumer_Name,
        allergies: req.body.allergies,
        orders: req.body.orders
      };
      const response = await mongoCreateOrder(newOrderObject);
      await printNewOrder(newOrderObject);
      return res.status(200).json({ message: "Order Successfully Registered", response });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultOrders(
      req.query.restaurantId,
      "orders",
      req.query.field,
      req.query.value
    );
    if (response.length > 0) {
      return res.status(200).json({ message: "Object(s) Read Successfully", response });
    } else {
      return res.status(404).json({ message: "Object(s) Was Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    logger.info("new Update Req");
    if (!req.body.restaurantId || !req.body.order_ID || !req.body.field || !req.body.value) {
      logger.info("Unsuccessfully Updated");
      return res.status(404).json({ message: "Unsuccessfully Request" });
    } else {
      const response = await mongoUpdateOrder(
        req.body.restaurantId,
        req.body.order_ID,
        req.body.field,
        req.body.value
      );
      if (response.matchedCount) {
        logger.info(
          `restId: ${req.body.restaurantId},  ${req.body.order_ID}, ${req.body.field}, ${req.body.value}`
        );
        return res.status(200).json({ message: "Successfully Updated", response });
      } else {
        return res.status(404).json({ message: "Unsuccessfully Request" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteOneOrder(req.body.restaurantId, req.body.field, req.body.value);
    if (response.deletedCount) {
      return res.status(200).json({ message: "Successfully Deleted", response });
    } else {
      return res
        .status(404)
        .json({ message: "Cannot Find Object With Specipic Value :(", response });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteOrders = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteManyOrders(req.body.restaurantId, req.body.field, req.body.value);
    if (response.deletedCount) {
      return res.status(200).json({ message: "Successfully Deleted", response });
    } else {
      return res
        .status(404)
        .json({ message: "Cannot Find Object With Specipic Value :(", response });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
