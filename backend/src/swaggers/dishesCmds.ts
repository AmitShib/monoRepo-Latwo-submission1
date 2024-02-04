import { logger } from "../logger";
import { updateArrayProp, deleteOneDish } from "../utils/updateArrayOfObjects";

export const updateArray = async (req, res) => {
  try {
    logger.info("new Update an Array Req");
    const response = await updateArrayProp(
      req.body.restaurantId,
      req.body.order_ID,
      req.body.dishId,
      req.body.field,
      req.body.value
    );
    if (response) {
      logger.info(`THIS ID WAS UPDATED ${req.body.order_ID}`);
      return res.status(200).json({ message: "Successfully ", response });
    } else {
      return res.status(404).json({ message: "Unsuccessfully Request" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDish = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteOneDish(req.body.restaurantId, req.body.order_ID, req.body.dishId);
    if (response) {
      return res.status(200).json({ message: "Successfully ", response });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
