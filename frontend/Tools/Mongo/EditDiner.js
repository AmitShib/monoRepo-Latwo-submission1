import axios from 'axios';
import config from '../Src/Config/config';
            
const {
         restBE: { baseUrl, subRoutes }
} = config;

// Define the URL of your API endpoint
const setUserUrl = `${baseUrl}${subRoutes.diners}`;

// Define the function to update a diner
const updateDiner = async (dinerId,phoneNumber, field, value) => {
  try {
    // Create a request body with the provided parameters
    const requestBody = {
      dinerId,
      phoneNumber,
      field, // Specify the field you want to update (e.g., 'phoneNumber' or 'email')
      value, // Specify the new value for the field
    };

    // Make the PUT request to the API
    const response = await axios.put(setUserUrl, requestBody);

    if (response.status === 200) {
      // Successful update
      console.log('Diner updated successfully:', response.data);
      return response.data; // You can return the updated data or handle it as needed
    } else {
      // Handle other status codes (e.g., error responses)
      console.error('Error updating diner:', response.statusText);
      throw new Error('Error updating diner');
    }
  } catch (error) {
    console.error('Error updating diner:', error.message);
    throw error; // You can re-throw the error or handle it as needed
  }
};

// // Example usage:
// updateDiner('1234', 'phoneNumber', '555-555-5555')
//   .then((updatedData) => {
//     // Handle the success response or updated data
//   })
//   .catch((error) => {
//     // Handle errors
//   });
