//import firebase from 'react-native-firebase';
//import 'react-native-get-random-values';
//import {v4 as uuidv4} from 'uuid';

//export function login({ email, password }) {
//    firebase.auth().signInWithEmailAndPassword(email, password)
//      .then((value) => console.log(value))
//  }
  
// export function signup({ email, password, displayName }) {
//    firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userInfo) => {
 //       console.log(userInfo)
 //       userInfo.user.updateProfile({ displayName: displayName.trim() })
 //         .then(() => { })
 //     })
//  }
  
  export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      authStateChanged(user);
    })
  }
  
  export function signout(onSignedOut) {
    firebase.auth().signOut()
      .then(() => {
        onSignedOut();
      })
  }
  

export function addFood(food, addComplete) {
    // Add an object via firebase
    firebase.firestore().collection('Foods').add({
        id: food.id,
        name : food.name,
        rating: food.rating,
        categories: food.categories,
        priceRating: food.priceRating,
        photo:  food.photo,
        duration: food.duration,
        description: food.description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => addComplete(data)).catch((error) => console.log(error));
}
// Function that check when the food is rertived into the app    
export async function getFood(FoodRetreived){

    var foodList = [];
    var snapshot  = await firebase.firestore().collection('Foods').orderBy('CreatedAt').get()

    snapshot.forEach((doc) => {
        foodList.push(doc.data())
    });

    FoodRetreived(foodList);

}
