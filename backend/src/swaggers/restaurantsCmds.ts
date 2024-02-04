import { logger } from "../logger";
import {
  mongoCreateRest,
  findMultRests,
  mongoUpdateRest,
  deleteOneRest
} from "../crud/restaurantsCollection";

export const createRest = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (!req.body.restaurantId || !req.body.restaurant_name) {
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    } else {
      const response = await mongoCreateRest({
        restaurantId: req.body.restaurantId,
        restaurant_name: req.body.restaurant_name,
        isBusy: false
      });
      return res.status(200).json({ message: "Order Successfully Registered", response });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRest = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultRests(req.query.field, req.query.value);
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

export const updateRest = async (req, res) => {
  try {
    logger.info("new Update Req");
    if ((!req.body.restaurantId || !req.body.value) && req.body.field !== "isBusy") {
      logger.error("Unsuccessfully Updated");
      return res.status(404).json({ message: "inValid Parameters" });
    } else {
      const response = await mongoUpdateRest(
        req.body.restaurantId + "",
        req.body.field,
        req.body.value
      );
      if (response.modifiedCount) {
        logger.info(` ${req.body.restaurantId}, ${req.body.field}, ${req.body.value}`);
        return res.status(200).json({ message: "Successfully Updated", response });
      } else {
        return res.status(404).json({ message: "Object didn't update" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRest = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteOneRest(req.body.value);
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
