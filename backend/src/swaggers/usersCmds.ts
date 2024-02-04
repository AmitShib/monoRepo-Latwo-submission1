import {
  createListing,
  deleteOneListing,
  findMultUsers,
  mongoUpdateUser
} from "../crud/usersCollection";
import { logger } from "../logger";

export const createUser = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (!req.body.restaurantId || !req.body.name || !req.body.userType || !req.body.userNumber) {
      logger.info("Unsuccessfully Registered :( , one of the body parameters is null");
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    }
    const response = await createListing({
      restaurantId: req.body.restaurantId,
      name: req.body.name,
      userType: req.body.userType,
      userNumber: req.body.userNumber,
      heName: req.body.heName
    });
    return res.status(200).json({ message: "Successfully Registered", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultUsers(req.query.restaurantId, req.query.field, req.query.value);
    if (response.toString()) {
      return res.status(200).json({ message: "Object(s) Read Successfully", response });
    } else {
      return res.status(404).json({ message: "Object(s) Was Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    logger.info("new Update Req");
    if (!req.body.restaurantId || !req.body.userNumber || !req.body.field || !req.body.value) {
      logger.info("Unsuccessfully Updated");
      return res.status(404).json({ message: "Unsuccessfully Request" });
    } else {
      const response = await mongoUpdateUser(
        req.body.restaurantId,
        req.body.userNumber,
        req.body.field,
        req.body.value
      );
      if (response.matchedCount) {
        logger.info(
          `${req.body.restaurantId}, ${req.body.userNumber}, ${req.body.name}, ${req.body.value}`
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

export const deleteUser = async (req, res) => {
  try {
    logger.info("new Delete Req " + req.query.userNumber);
    const response = await deleteOneListing(req.query.restaurantId, req.query.userNumber);
    if (response.deletedCount) {
      return res.status(200).json({ message: "Successfully Deleted", response });
    } else {
      return res.status(404).json({
        message: `Cannot Find Object With Specipic id ${req.query.userNumber}:(  `,
        response
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
