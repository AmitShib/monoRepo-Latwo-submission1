import { logger } from "../logger";
import {
  deleteManyMenuDish,
  deleteOneMenuDish,
  findMultOMenuDishes,
  mongoCreateMenuDish,
  mongoUpdateMenuDish
} from "../crud/menuCollection";

export const createMenuDish = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (
      !req.body.dish_id ||
      !req.body.restaurant_id ||
      !req.body.dishName ||
      !req.body.dishMainIng ||
      !req.body.dishSemIng ||
      !req.body.dishSemIngEnglish ||
      !req.body.price ||
      !req.body.dishType ||
      !req.body.isAvailable
    ) {
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    } else {
      const response = await mongoCreateMenuDish(req.body);
      return res.status(200).json({ message: "Order Successfully Registered", response });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMenuDish = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultOMenuDishes(
      req.query.restaurantId,
      "menu",
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

export const updateMenuDish = async (req, res) => {
  try {
    logger.info("new Update Req");
    if (!req.body.dish_id || !req.body.restaurant_id || !req.body.field || !req.body.value) {
      logger.info("Unsuccessfully Updated");
      return res.status(404).json({ message: "Unsuccessfully Request" });
    } else {
      const response = await mongoUpdateMenuDish(
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

export const deleteMenuDish = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteOneMenuDish(req.body.restaurantId, req.body.field, req.body.value);
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
    const response = await deleteManyMenuDish(
      req.body.restaurantId,
      req.body.field,
      req.body.value
    );
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
