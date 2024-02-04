import { Image, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState, useContext } from 'react';
import { Text } from "../../DefaultFont";
import colors from "../../Tools/ThemeConsts/colors";
import images from "../../Tools/ThemeConsts/images";
import { ScrollView } from "react-native-gesture-handler";

import QRCode from 'react-native-qrcode-svg'; 
import ThemeContext from "../../ThemeContext";

import languagekeys from "../../Screens/Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Screens/Identidication/Login/localization/LanguageUtils";

const generateUniqueID = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const randomuninumber = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
  return randomNumber, randomuninumber;
};

const ProfilesCircles = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [showQRCode, setShowQRCode] = useState(false);
  const tableID = generateUniqueID();

  const handlePress = () => {
    setShowQRCode(true);
  };

  const handleExit = () => {
    setShowQRCode(false);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={images.ido}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Image
          source={images.gido}
          resizeMode="contain"
          style={styles.profileImage}
        />
        {/* Plus button moved to the right and overlap style adjusted */}
        <TouchableOpacity onPress={handlePress} style={styles.circleButton}>
          <Image source={images.add} resizeMode="contain" style={styles.circleImage} />
        </TouchableOpacity>
      </View>

      {/* Render the QR code inside a Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQRCode}
        onRequestClose={() => setShowQRCode(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: COLORS[mode].background }]}>
            <QRCode value={tableID} size={200} />
            <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
              <Text>{LanguageUtils.getLangText(languagekeys.close)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10, // Adjust the padding as needed
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleButton: {
    marginLeft: -20, // Adjust for overlap
  },
  circleImage: {
    width: 70,
    height: 70,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: -20, // Adjust the negative margin for overlap
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  exitButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
});

export default ProfilesCircles;

// ## DONT DELETE IT IN ANY COST ##//
// Its a working ProfielCircle with Amplify Code // 

// import { Image, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
// import React, { useContext, useState, useEffect } from 'react';
// import { Text } from "../../DefaultFont";
// import colors from "../../Tools/ThemeConsts/colors";
// import images from "../../Tools/ThemeConsts/images";
// import { ScrollView } from "react-native-gesture-handler";

// import QRCode from 'react-native-qrcode-svg'; 
// import { Auth } from 'aws-amplify'; 
// import ThemeContext from "../../ThemeContext";

// //import { API, graphqlOperation } from 'aws-amplify';
// //import { createTable } from './graphql/mutations';

// const generateUniqueID = () => {
//    const randomNumber = Math.floor(Math.random() * 100) + 1;
//     // Use timestamp combined with a random number to create a unique ID
//     const randomuninumber = `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
//     return randomNumber,randomuninumber;
//   };
  
//   const ProfilesCircles = () => {
//     const { mode, COLORS } = useContext(ThemeContext);
//     const [showQRCode, setShowQRCode] = useState(false);
//     const [userProfile, setUserProfile] = useState(null); // Store the user profile data here
//     const [isLoading, setIsLoading] = useState(true); // Loading state for user profile data
//     const tableID = generateUniqueID();
  
//     useEffect(() => {
//       // Fetch the user's profile data when the component mounts
//       fetchUserProfile();
//     }, []);
  
//     const fetchUserProfile = async () => {
//       try {
//         const userInfo = await Auth.currentAuthenticatedUser(); // Get the current authenticated user
//         // Assuming that your user profile data is stored in "attributes" field
//         const userProfileData = userInfo.attributes; // User profile data
//         const { name, email, profilePicture } = userProfileData; // Extract required fields
  
//         // Set the user profile data in the state, including the profile picture
//         setUserProfile({ name, email, profilePicture });
//         setIsLoading(false); // Mark loading as complete
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         setIsLoading(false); // Mark loading as complete (even if there was an error)
//       }
//     };
  
//     const handlePress = () => {
//       // Toggle the showQRCode state when the button is pressed
//       setShowQRCode(!showQRCode);
//     };
  
//     const handleExit = () => {
//       // Close the Modal when the exit button is pressed
//       setShowQRCode(false);
//     };
      
//     //  handlePress function content with the following to toggle the QR code display:
//     // const handlePress = () => {
//     //   setShowQRCode(true);
//     // };
  
//     return (
//       <View>
  
//         {!isLoading && userProfile && (
//     <View style={styles.rowContainer}>
//         <TouchableOpacity onPress={handlePress}>
//         <Image source={images.add} resizeMode="contain" style={{ width: 70, height: 70 }} />
//          </TouchableOpacity>
//       <Image
//         source={images.ido}
//         //source={{ uri: userProfile.profilePicture }} // To Connect to the user Profile Picture
//         resizeMode="contain"
//         style={{ width: 70, height: 70, borderRadius: 35 }} // Adjust the size and border radius as needed
//       />

//     </View>
//   )}

//       {/* Render the QR code inside a Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showQRCode}
//         onRequestClose={() => setShowQRCode(false)}
//       >
//         <View style={[styles.modalContainer, ]}>
//             <View style={[styles.modalContent, { backgroundColor: COLORS[mode].background }]}>
//             {/* Display user profile information */}
//             {!isLoading && userProfile && (
//               <>
//                 <Text style = {{color:COLORS[mode].text}}>Table ID: {tableID}</Text>
//               </>
//             )}

//             <QRCode value={tableID} size={200} />
//             <TouchableOpacity onPress={handleExit} style={styles.exitButton}>
//               <Text>סגור</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     rowContainer: {
//         flexDirection: 'row',
//         alignItems: 'center', 
//         justifyContent: 'flex-end', 
//         marginBottom: 10,
//       },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   exitButton: {
//     marginTop: 10,
//     backgroundColor: colors.primary, 
//     padding: 10,
//     borderRadius: 8,
//   },
// });

// export default ProfilesCircles;



// //Ready to use Connect The table to DB
// // useEffect(() => {
// //     // ... (your existing code)
  
// //     const saveTableIDToDB = async () => {
// //       try {
// //         // Create a new entry in the Table model
// //         await API.graphql(
// //           graphqlOperation(createTable, { input: { id: tableID, userId: userProfile.id } })
// //         );
// //         console.log('Table ID saved to the database successfully.');
// //       } catch (error) {
// //         console.error('Error saving Table ID to the database:', error);
// //       }
// //     };
  
// //     // Call the function to save the tableID to the database
// //     saveTableIDToDB();
// //   }, [tableID]);
  