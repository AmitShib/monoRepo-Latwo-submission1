import { createContext, useContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    gender: '',
    birthdate: '',
    password: '',
    username: '',
    code: '',
    profile: '',
    // Other user-related data
  });
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const [actionType, setActionType] = useState('signup'); // Default to 'signup'



  const fetchUserData = async () => {
    try {
      const authenticated = await AsyncStorage.getItem("authenticated");

      if (authenticated === "true") {
        // If the user is authenticated, set actionType to 'signin'
        setActionType('signin');
      }

      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const userAttributes = authenticatedUser.attributes;

      setUser({
        firstname: userAttributes.name || '',
        lastname: userAttributes.family_name || '',
        email: userAttributes.email || '',
        phonenumber: userAttributes.phone_number || '',
        profile: userAttributes.phone_number || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Method to set actionType as 'signup'
  const setSignupActionType = () => {
    setActionType('signup');
  };

  // Method to set actionType as 'signin'
  const setSigninActionType = () => {
    setActionType('signin');
  };

  return (
    <UserContext.Provider value={{ user, setUser, actionType, setSignupActionType, setSigninActionType }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
