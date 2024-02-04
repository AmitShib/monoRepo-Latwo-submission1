import { randomInt } from "crypto";

import { logger } from "../logger";
import {
  mongoCreateTable,
  findMultTables,
  mongoUpdateTable,
  mongoUpdateFieldsTable,
  deleteOneTable
} from "../crud/tablesCollection";
import { mergeOrders, mergeMembers } from "../utils/mergeTables";
import { moveToHistory } from "../utils/history";

export const createTable = async (req, res) => {
  try {
    logger.info("new Post Req");
    if (!req.body.table_id || !req.body.shape || !req.body.restaurantId) {
      logger.info("Unsuccessfully Registered :( , one of the body parameters is null");
      return res
        .status(404)
        .json({ message: "Unsuccessfully Registered :( , one of the body parameters is null" });
    }

    const response = await mongoCreateTable({
      table_id: req.body.table_id,
      shape: req.body.shape,
      owner: req.body.owner,
      x: Math.floor(Math.random() * 100) + 1,
      y: Math.floor(Math.random() * 100) + 1,
      table_open_time: new Date().toISOString(),
      status: "Empty",
      members: req.body.members,
      members_amount: req.body.members.length,
      restaurantId: req.body.restaurantId,
      callToWaiter: false
    });
    return res.status(200).json({ message: "Successfully Registered", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTable = async (req, res) => {
  try {
    logger.info("new Get Req");
    const response = await findMultTables(req.query.restaurantId, req.query.field, req.query.value);
    if (response.length > 0) {
      return res.status(200).json({ message: "Table(s) Read Successfully", response });
    } else {
      return res.status(404).json({ message: "Table(s) Was Not Found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTable = async (req, res) => {
  try {
    logger.info("new Update Req");
    if (!req.body.restaurantId || !req.body.table_id || !req.body.field || !req.body.value) {
      logger.info("VALIDATOR SUCCESE");
      return res
        .status(404)
        .json({ message: "Table Unsuccessfully Updated , one of the parameters is null" });
    }
    const response = await mongoUpdateTable(
      req.body.restaurantId,
      req.body.table_id,
      req.body.field,
      req.body.value
    );
    if (response.matchedCount) {
      logger.info(
        `restID: ${req.body.restaurantId} ,${req.body.table_id}, ${req.body.field}, ${req.body.value}`
      );
      return res.status(200).json({ message: "Table Successfully Updated", response });
    } else {
      return res
        .status(404)
        .json({ message: "Table Unsuccessfully Updated , one of the parameters is null" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTable = async (req, res) => {
  try {
    logger.info("new Delete Req");
    const response = await deleteOneTable(req.body.restaurantId, req.body.field, req.body.value);
    if (response.deletedCount) {
      return res.status(200).json({ message: "Successfully Deleted", response });
    } else {
      return res
        .status(404)
        .json({ message: "Cannot Find Object With Specipic Value :(", response });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const merge = async (req, res) => {
  try {
    logger.info("New Merge Tables Req");
    const updateTableIdRes = await mergeOrders(
      req.body.restaurantId,
      req.body.table_id_1,
      req.body.table_id_2
    );
    const updateTableShapeRes = await mongoUpdateTable(
      req.body.restaurantId,
      req.body.table_id_1,
      "shape",
      "rectengle"
    );
    const updateTableMembers = await mergeMembers(
      req.body.restaurantId,
      req.body.table_id_1,
      req.body.table_id_2
    );
    const updateTableStatus = await mongoUpdateTable(
      req.body.restaurantId,
      req.body.table_id_2,
      "status",
      "Empty"
    );

    return res.status(200).json({ message: "Requst ended Successfully" });
    // if (updateTableIdRes.length && updateTableShapeRes.matchedCount) {
    //   return res.status(200).json({ message: "Object(s) Read and Updated Successfully" });
    // } else {
    //   return res.status(404).json({ message: "Table Unsuccessfully Updated " });
    // }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const closeTable = async (req, res) => {
  try {
    logger.info("New Close Table Req");
    const emptyTableProps = {
      members_amount: 0,
      status: "Empty",
      owner: "none",
      members: [],
      table_open_time: new Date().toISOString()
    };
    const resetMemberAmount = await mongoUpdateFieldsTable(
      req.query.restaurantId,
      req.query.table_id,
      emptyTableProps
    );
    const moveOrdersToHistoryRes = await moveToHistory(req.query.restaurantId, req.query.table_id);
    if (resetMemberAmount.matchedCount) {
      return res.status(200).json({ message: "Object Updated Successfully" });
    } else {
      return res.status(404).json({ message: "Object Unsuccessfully Updated " });
    }
  } catch (error) {
    logger.error(error);
  }
};
