// function verifyAuthChallengeResponse(event) {
//   if (
//     event.request.privateChallengeParameters.answer ===
//     event.request.challengeAnswer
//   ) {
//     event.response.answerCorrect = true;
//   } else {
//     event.response.answerCorrect = false;
//   }
//   return event;  // Explicitly return the event object
// }

// exports.handler = async (event) => {
//   try {
//     return verifyAuthChallengeResponse(event);
//   } catch (error) {
//     console.error("Error verifying the auth challenge:", error);
//     throw error;  // Ensure Lambda recognizes the error
//   }
// };


exports.handler = (event, context) => {
  console.log(event);
  if (
    event.request.privateChallengeParameters.answer ===
    event.request.challengeAnswer
  ) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }
  context.done(null, event);
};