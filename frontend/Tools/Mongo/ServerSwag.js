// const express = require('express');
// const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Import the cors package

// const { Schema } = mongoose;

// const app = express();
// const port = 3000;

// app.use(cors()); // Enable CORS for all routes

// app.use(bodyParser.json());

// // Swagger configuration
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Your API Title',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./ServerSwag.js'], // Specify the file(s) where your API routes are defined
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Connect to MongoDB
// mongoose.connect('mongodb://ec2-16-171-150-138.eu-north-1.compute.amazonaws.com:27017/',
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define a schema for your MongoDB collection
// const yourSchema = new Schema({
//   field1: String,
//   field2: Number,
//   stringsArray: [String], // Update the schema field to an array of strings
// });

// const YourModel = mongoose.model('YourModel', yourSchema);

// /**
//  * @swagger
//  * /api/data:
//  *   post:
//  *     summary: Create a new data entry
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               field1:
//  *                 type: string
//  *               field2:
//  *                 type: number
//  *               stringsArray:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *     responses:
//  *       200:
//  *         description: Data entry created successfully
//  */
// app.post('/api/data', (req, res) => {
//   const { field1, field2, stringsArray } = req.body;

//   const newData = new YourModel({ field1, field2, stringsArray });
//   newData.save()
//     .then(() => {
//       res.status(200).send('Data entry created successfully');
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('An error occurred while creating the data entry');
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
