
// // export const AddDoc = async (title, content) => {
// //     try {
// //       const response = await fetch('http://localhost:3000/api/documents', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ title, content }),
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Failed to save document');
// //       }
  
// //       const savedDocument = await response.json();
// //       return savedDocument;
// //     } catch (error) {
// //       console.error('Error saving document:', error);
// //       throw error;
// //     }
// //   };

// const AddDoc = async (data) => {
//   try {
//     const response = await fetch('http://localhost:3000/api/data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       console.log('Data sent successfully');
//     } else {
//       console.log('Failed to send data');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default AddDoc;

// AddDoc.js

import axios from "axios";

// Define the URL of your backend server where the API endpoint for adding a document is located
//const backendURL = "https://github.com/yarin-cohen02/Backend-Consumer.git"; // Replace with your actual backend URL
const backendURL = "http://localhost:5000"; // Replace with your actual backend URL


// Define the API endpoint for adding a document in your backend (adjust this based on your backend setup)
const addDocumentEndpoint = "/user"; // Replace with the actual endpoint on your backend

// Function to add a new document by sending a POST request to the backend
export function AddDoc(data) {
  // Make the POST request to the backend using Axios
  axios
    .post(`${backendURL}${addDocumentEndpoint}`, data)
    .then(response => {
      // Handle the response data (if needed)
      console.log(response.data);
      // Optionally, you can perform actions like showing a success message to the user.
    })
    .catch(error => {
      // Handle any error that occurs during the request
      console.error("Error:", error);
      // Optionally, you can show an error message to the user or perform other error handling.
    });
}

