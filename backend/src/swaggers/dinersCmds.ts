import {
  createListing,
  deleteOneListing,
  findMultUsers,
  mongoUpdateUser
} from "../crud/dinersCollection";
import { logger } from "../logger";

export const createDiner = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (!req.body.dinerId || !req.body.firstName || !req.body.lastName || !req.body.phoneNumber) {
      logger.info("Unsuccessfully Registered :( , one of the body parameters is null");
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    }
    const response = await createListing({
      dinerId: req.body.dinerId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      allergies: req.body.allergies, //array- need to check if something has to be changed
      lifestyle: req.body.lifestyle,
      dontLike: req.body.dontLike,
      birthday: req.body.birthday, //date
      address: req.body.address
    });
    return res.status(200).json({ message: "Successfully Registered", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDiners = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultUsers(req.query.dinerId, req.query.field, req.query.value);
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

export const updateDiner = async (req, res) => {
  try {
    logger.info("new Update Req");
    if (!req.body.dinerId || !req.body.phoneNumber || !req.body.field || !req.body.value) {
      logger.info("Unsuccessfully Updated");
      return res.status(404).json({ message: "Unsuccessfully Request" });
    } else {
      const response = await mongoUpdateUser(
        req.body.dinerId,
        req.body.phoneNumber,
        req.body.field,
        req.body.value
      );
      if (response.matchedCount) {
        logger.info(
          `${req.body.dinerId}, ${req.body.phoneNumber}, ${req.body.name}, ${req.body.value}`
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

export const deleteDiner = async (req, res) => {
  try {
    logger.info("new Delete Req " + req.query.phoneNumber);
    const response = await deleteOneListing(req.query.dinerId, req.query.phoneNumber);
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
