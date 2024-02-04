import path from "path";
import fs from "fs";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const rootDir = path.resolve(__dirname, "../");
const pkgJsonPath = path.join(rootDir, "package.json");

const pkgJsonContent = fs.readFileSync(pkgJsonPath, "utf8");
const pkgJson = JSON.parse(pkgJsonContent);

const version = pkgJson.version;

import { logger } from "./logger";
import { getUsers, createUser, updateUser, deleteUser } from "./swaggers/usersCmds";
import { createOrder, getOrder, updateOrder, deleteOrder } from "./swaggers/ordersCmds";
import {
  createTable,
  updateTable,
  getTable,
  deleteTable,
  merge,
  closeTable
} from "./swaggers/tablesCmds";
import { createRest, updateRest, getRest, deleteRest } from "./swaggers/restaurantsCmds";
import { updateArray, deleteDish } from "./swaggers/dishesCmds";
import { createMenuDish, deleteMenuDish, getMenuDish, updateMenuDish } from "./swaggers/menuCmds";
import { getPastOrder, moveToHistory, getOrderByFilters } from "./utils/history";
import { getDiners, createDiner, updateDiner, deleteDiner } from "./swaggers/dinersCmds";

export const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*"
  })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Node JS API project for mongoDB",
      version
    },
    servers: [
      {
        url: "http://localhost:5001/"
      }
    ]
  },
  apis: ["./src/index.ts"]
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get(["/", "/sanity"], (req, res) => {
  res.status(200).send("Rest BE is UP!");
});

/**
 * @swagger
 *  /users:
 *  post:
 *    tags:
 *    - Users
 *    summary: Create New User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -restaurantId
 *              -name
 *              -userNumber
 *              -userType
 *              -heName
 *            properties:
 *              restaurantId:
 *                type: string
 *                default: 24
 *              name:
 *                type: string
 *                default: Ariel
 *              userNumber:
 *                type: string
 *                default: 2402
 *              userType:
 *                type: string
 *                default: Admin
 *              heName:
 *                type: string
 *                default: אריאל
 *    responses:
 *      200:
 *        description: Object Create Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               name:
 *                 type: string
 *               userNumber:
 *                 type: string
 *               userType:
 *                 type: string
 *               heName:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *      404:
 *        description: Request Denied
 *        content:
 *          application/json:
 *            schema:
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *    operationId: createListing
 */
app.post("/users", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user(s)
 *     tags:
 *      - Users
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id
 *       - name: field
 *         in: query
 *         required: false
 *         description: The field of the user to retrieve
 *       - name: value
 *         in: query
 *         required: false
 *         description: The value of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: User(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: findMultListing
 */
app.get("/users", getUsers);

/**
 * @swagger
 * /users:
 *  put:
 *    summary: Update User by field
 *    tags:
 *    - Users
 *    description: The amount of user(s) to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              restaurantId:
 *                type: string
 *                description: The id of the restaurant.
 *              userNumber:
 *                type: string
 *                description: The id of the user's listing to update.
 *              field:
 *                type: string
 *                description: The field of the user's listing to update.
 *              value:
 *                type: string
 *                description: The new value to update the user's listing with.
 *            required:
 *              - restaurantId
 *              - userNumber
 *              - field
 *              - value
 *    responses:
 *      200:
 *        description: User Update Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A success message.
 *                response:
 *                  type: object
 *                  description: The updated listing.
 *      400:
 *        description: User Update Unsuccessfully :(
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *    operationId: mongoUpdateUser
 */
app.put("/users", updateUser);

/**
 * @swagger
 * /users:
 *   delete:
 *     tags:
 *     - Users
 *     summary: Deletes a user listing by id
 *     description: Deletes a user listing with the specified id from the database.
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant ID of the user to Delete
 *       - name: userNumber
 *         in: query
 *         required: false
 *         description: The Number of the user to Delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the user listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 response:
 *                   type: object
 *                   description: The response returned by the `deleteOneListing` function.
 *       404:
 *         description: Unable to find the user listing with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */

app.delete("/users", deleteUser);

/**
 * @swagger
 *  /orders:
 *  post:
 *    tags:
 *    - Orders
 *    summary: Create New order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -table_Number
 *              -restaurantId
 *              -order_ID
 *              -consumer_Name
 *              -allergies
 *              -orders
 *            properties:
 *              table_Number:
 *                type: string
 *                default: 24
 *              restaurantId:
 *                type: string
 *                default: 1
 *              order_ID:
 *                type: string
 *                default: 24
 *              consumer_Name:
 *                type: string
 *                default: Rave E
 *              allergies:
 *                type: array
 *                default: [Batzal , Onion]
 *              orders:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    dishId:
 *                      type: string
 *                      default: 1234
 *                    dishName:
 *                      type: string
 *                      default: Raviolo
 *                    dishMainIng:
 *                      type: array
 *                      default: [eggplant , pepper ]
 *                    price:
 *                      type: string
 *                      default: 65
 *                    discount:
 *                      type: string
 *                      default: 0
 *                    dishSemIng:
 *                      type: array
 *                      default: [onion, watermelon ]
 *                    adjustments:
 *                      type: array
 *                      default: [without Onion,without olives]
 *                    status:
 *                      type: string
 *                      default: Pending
 *                    dishType:
 *                      type: string
 *                      default: Kitchen | Bar
 *    responses:
 *      200:
 *        description: Object Create Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               Date:
 *                 type: string
 *               Table_Number:
 *                 type: string
 *               restaurantId:
 *                 type: string
 *               order_ID:
 *                 type: string
 *               Consumer_Name:
 *                 type: string
 *               Allergies:
 *                 type: array
 *               Orders:
 *                 type: object
 *      404:
 *        description: Request Denied
 *        content:
 *          application/json:
 *            schema:
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *    operationId: createOrder
 */
app.post("/orders", createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get order
 *     tags:
 *      - Orders
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The order's restaurant Id to retrieve
 *       - name: field
 *         in: query
 *         required: false
 *         description: The order field to retrieve
 *       - name: value
 *         in: query
 *         required: false
 *         description: The order props to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Object(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Object(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: findMultOrders
 */
app.get("/orders", getOrder);

/**
 * @swagger
 * /orders:
 *  put:
 *    summary: Update Order
 *    tags:
 *    - Orders
 *    description: Update an order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              restaurantId:
 *                type: string
 *                description: The restaurant Id of the order's listing to update.
 *              order_ID:
 *                type: string
 *                description: The name of the order's listing to update.
 *              field:
 *                type: string
 *                description: The name of the order's listing to update.
 *              value:
 *                type: string
 *                description: The new value to update the order's listing with.
 *            required:
 *              - restaurantId
 *              - order_ID
 *              - field
 *              - value
 *    responses:
 *      200:
 *        description: Object(s) Update Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A success message.
 *                response:
 *                  type: object
 *                  description: The updated listing.
 *      400:
 *        description: Object(s) Update Unsuccessfully :(
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *    operationId: updateOrder
 */
app.put("/orders", updateOrder);

/**
 * @swagger
 * /orders:
 *   delete:
 *     tags:
 *     - Orders
 *     summary: Deletes an order
 *     description: Deletes an order listing with the specified field from the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: The restaurant Id of the order listing to delete.
 *               field:
 *                 type: string
 *                 description: The field of the order listing to delete.
 *               value:
 *                 type: string
 *                 description: The value of the order listing to delete.
 *             required:
 *               - restaurantId
 *               - field
 *               - value
 *     responses:
 *       200:
 *         description: Successfully deleted the order listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 response:
 *                   type: object
 *                   description: The response returned by the `deleteOneOrder` function.
 *       404:
 *         description: Unable to find the user listing with the specified field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */
app.delete("/orders", deleteOrder);

/**
 * @swagger
 * /dishes:
 *  put:
 *    summary: Update Dish
 *    tags:
 *    - Dishes
 *    description: Update a Dish
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              restaurantId:
 *                type: string
 *                description: The restaurant Id of the order's listing to update.
 *              order_ID:
 *                type: string
 *                description: The id of the order's listing to update.
 *              dishId:
 *                type: string
 *                description: The id of the order's dish to update.
 *              field:
 *                type: string
 *                description: The props name to update the order's dish .
 *              value:
 *                type: string
 *                description: The value to update the order's dish .
 *            required:
 *              - restaurantId
 *              - order_ID
 *              - dishId
 *              - field
 *              - value
 *    responses:
 *      200:
 *        description: Object(s) Update Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A success message.
 *                response:
 *                  type: object
 *                  description: The updated listing.
 *      400:
 *        description: Object(s) Update Unsuccessfully :(
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *    operationId: updateArray
 */
app.put("/dishes", updateArray);

/**
 * @swagger
 * /delete-dish:
 *   put:
 *     tags:
 *     - Dishes
 *     summary: Deletes a dish
 *     description: Deletes an dish listing with the specified field from the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: The order's restaurant Id of the dish listing to delete.
 *               order_ID:
 *                 type: string
 *                 description: The order's id of the dish listing to delete.
 *               dishId:
 *                 type: string
 *                 description: The dish's id of the dish listing to delete.
 *             required:
 *               - restaurantId
 *               - order_ID
 *               - dishId
 *     responses:
 *       200:
 *         description: Successfully deleted the dish listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 response:
 *                   type: object
 *                   description: The response returned by the `deleteOneDish` function.
 *       404:
 *         description: Unable to find the dish listing with the specified field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */
app.put("/delete-dish", deleteDish);

/**
 * @swagger
 *  /tables:
 *  post:
 *    tags:
 *    - Tables
 *    summary: Create New table
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -table_id
 *              -shape
 *              -owner
 *              -members
 *              -restaurantId
 *            properties:
 *              table_id:
 *                type: string
 *                default: 2
 *              shape:
 *                type: string
 *                default: round
 *              owner:
 *                type: string
 *                default: Ariel
 *              members:
 *                type: array
 *                default: [arik, roy , rave , ori]
 *              restaurantId:
 *                type: string
 *                default: 44
 *    responses:
 *      200:
 *        description: Object Create Successfully
 *        content:
 *          application/json:
 *            schema:
 *      404:
 *        description: Request Denied
 *        content:
 *          application/json:
 *            schema:
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *    operationId: createOrder
 */
app.post("/tables", createTable);

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Get tables
 *     tags:
 *      - Tables
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id of the table to retrieve
 *       - name: field
 *         in: query
 *         required: false
 *         description: The field of the table to retrieve
 *       - name: value
 *         in: query
 *         required: false
 *         description: The props of the table to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Table(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: findMultTables
 */
app.get("/tables", getTable);
/**
 * @swagger
 * /tables:
 *  put:
 *    summary: Update Table
 *    tags:
 *    - Tables
 *    description: Update a field in table
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              restaurantId:
 *                type: string
 *                description: The restaurant Id of the table listing to update.
 *              table_id:
 *                type: string
 *                description: The table_id of the table listing to update.
 *              field:
 *                type: string
 *                description: The field of the table listing to update.
 *              value:
 *                type: string
 *                description: The new value to update the table listing with.
 *            required:
 *              - restaurantId
 *              - table_id
 *              - field
 *              - value
 *    responses:
 *      200:
 *        description: Object(s) Update Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A success message.
 *                response:
 *                  type: object
 *                  description: The updated listing.
 *      400:
 *        description: Object(s) Update Unsuccessfully :(
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *    operationId: updateTable
 */
app.put("/tables", updateTable);

/**
 * @swagger
 * /tables:
 *   delete:
 *     tags:
 *     - Tables
 *     summary: Deletes a table listing
 *     description: Deletes an table listing with the specified field from the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 description: The restaurant Id of the table listing to delete.
 *               field:
 *                 type: string
 *                 description: The field of the table listing to delete.
 *               value:
 *                 type: string
 *                 description: The value of the table listing to delete.
 *             required:
 *               - restaurantId
 *               - field
 *               - value
 *     responses:
 *       200:
 *         description: Successfully deleted the tables listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 response:
 *                   type: object
 *                   description: The response returned by the `deleteOneTableByName` function.
 *       404:
 *         description: Unable to find the table listing with the specified table.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *       500:
 *         description: Unable to find the table listing with the specified table.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */
app.delete("/tables", deleteTable);

/**
 * @swagger
 *  /restaurants:
 *  post:
 *    tags:
 *    - Restaurants
 *    summary: Create New Rest
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -restaurantId
 *              -restaurant_name
 *            properties:
 *              restaurantId:
 *                type: string
 *                default: 02
 *              restaurant_name:
 *                type: string
 *                default: Ori's Coffee
 *    responses:
 *      200:
 *        description: Object Create Successfully
 *        content:
 *          application/json:
 *            schema:
 *      404:
 *        description: Request Denied
 *        content:
 *          application/json:
 *            schema:
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *    operationId: createRest
 */
app.post("/restaurants", createRest);

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get Rests
 *     tags:
 *      - Restaurants
 *     parameters:
 *       - name: field
 *         in: query
 *         required: false
 *       - name: value
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: The props of the Rest to retrieve
 *     responses:
 *       200:
 *         description: Rest(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Rest(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: getRest
 */
app.get("/restaurants", getRest);

/**
 * @swagger
 * /restaurants:
 *  put:
 *    summary: Update Rest
 *    tags:
 *    - Restaurants
 *    description: Update a field in Rest
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              restaurantId:
 *                type: string
 *                description: The id of the Rest listing to update.
 *              field:
 *                type: string
 *                description: The field of the rest listing to update.
 *              value:
 *                type: string
 *                description: The new value to update the rest listing with.
 *            required:
 *              - restaurantId
 *              - field
 *              - value
 *    responses:
 *      200:
 *        description: Object(s) Update Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A success message.
 *                response:
 *                  type: object
 *                  description: The updated listing.
 *      400:
 *        description: Object(s) Update Unsuccessfully :(
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: An Unsuccess message.
 *                response:
 *                  type: object
 *                  description: The updated donesn't success.
 *    operationId: updateRest
 */
app.put("/restaurants", updateRest);

/**
 * @swagger
 * /restaurants:
 *   delete:
 *     tags:
 *     - Restaurants
 *     summary: Deletes a Rest listing
 *     description: Deletes an Rest listing with the specified field from the database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: The field of the rest listing to delete.
 *               value:
 *                 type: string
 *                 description: The value of the table listing to delete.
 *             required:
 *               - field
 *               - value
 *     responses:
 *       200:
 *         description: Successfully deleted the rest listing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 response:
 *                   type: object
 *                   description: The response returned by the `deleteRest` function.
 *       404:
 *         description: Unable to find the rest listing with the specified id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 *       500:
 *         description: Unable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message.
 */
app.delete("/restaurants", deleteRest);

/**
 * @swagger
 *  /merge:
 *  post:
 *    tags:
 *    - Utils
 *    summary: Merge Two Tables
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              -restaurantId
 *              -table_id_1
 *              -table_id_2
 *            properties:
 *              restaurantId:
 *                type: string
 *                default: 24
 *              table_id_1:
 *                type: string
 *                default: 02
 *              table_id_2:
 *                type: string
 *                default: 04
 *    responses:
 *      200:
 *        description: Object Create Successfully
 *        content:
 *          application/json:
 *            schema:
 *      404:
 *        description: Request Denied
 *        content:
 *          application/json:
 *            schema:
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *    operationId: merge
 */
app.post("/merge", merge);

/**
 * @swagger
 * /close-table:
 *   put:
 *     summary: Close Table - Checkout
 *     tags:
 *      - Utils
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id to retrieve
 *       - name: table_id
 *         in: query
 *         required: false
 *         description: The table id to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rest(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Rest(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: getPastOrder
 */
app.put("/close-table", closeTable);

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get History Order(s)
 *     tags:
 *      - History
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id to retrieve
 *       - name: date
 *         in: query
 *         required: false
 *         description: The date prop of the object to retrieve
 *       - name: time
 *         in: query
 *         required: false
 *         description: The time of the object to retrieve
 *       - name: consumer_Name
 *         in: query
 *         required: false
 *         description: The consumer_Name of the object to retrieve
 *       - name: table_Number
 *         in: query
 *         required: false
 *         description: The table_Number of the object to retrieve
 *       - name: order_ID
 *         in: query
 *         required: false
 *         description: The order_ID of the object to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rest(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Rest(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: getOrderByFilters
 */
app.get("/history", getOrderByFilters);

/**
 * @swagger
 * /close-table:
 *   put:
 *     summary: Close Table - Checkout
 *     tags:
 *      - Utils
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id to retrieve
 *       - name: table_id
 *         in: query
 *         required: false
 *         description: The table id to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rest(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Rest(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: getPastOrder
 */
app.put("/close-table", closeTable);

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get Menu dish(s)
 *     tags:
 *      - Menu
 *     parameters:
 *       - name: restaurantId
 *         in: query
 *         required: false
 *         description: The restaurant Id to retrieve
 *     responses:
 *       200:
 *         description: Rest(s) Read Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: object
 *       404:
 *         description: Rest(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     operationId: getPastOrder
 */
app.get("/menu", getMenuDish);
app.post("/menu", createMenuDish);
app.put("/menu", updateMenuDish);
app.delete("/menu", deleteMenuDish);

app.get("/diners", getDiners);
app.post("/diners", createDiner);
app.put("/diners", updateDiner);
app.delete("/diners", deleteDiner);

app.listen(5001, () => {
  logger.info("server is up!");
});
