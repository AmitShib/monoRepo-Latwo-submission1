
            import axios from 'axios';
            import config from '../Src/Config/config';
            
            const {
              restBE: { baseUrl, subRoutes }
            } = config;
            
            const setUserUrl = `${baseUrl}${subRoutes.diners}`;
            
            export const createDiner = async (dinerData) => { // Accept the data object as a single parameter
              try {
                const response = await axios.post(setUserUrl, JSON.stringify(dinerData), {
                  headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                  },
                });
            
                if (response.status === 200) {
                  console.log('Diner created successfully:', response.data);
                  return response.data; // Return the response data to the caller
                } else {
                  console.error('Error creating diner:', response.statusText);
                }
              } catch (error) {
                console.error('Error creating diner:', error.message);
              }
            };
                       
