import {db, auth} from 'boot/firebase'




  // export const registerUser = ({}, payload) => {
  //   auth.createUserWithEmailAndPassword(payload.email, payload.password)
  // .then((response) => {
  //   // Signed in 
  //   let userId = auth.currentUser.uid;
  //   db.collection("users").doc("users").set({
  //     ...payload
  //   })
  //   console.log(userId);
  //   // ...
  // }).then (() => console.log("success"))
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(errorCode, errorMessage);
  //   // ..
  // });
  // }
    
export const registerUser = ({ }, payload) => {
  auth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      let user = auth.currentUser;
      console.log(user)
      user.updateProfile({ displayName: payload.name }).then(() => {
        let registeredUser = {
          id: user.uid,
          email: user.email,
          name: payload.name,
          username: payload.username,
          surname: payload.surname,
          gender: payload.gender,
          age: payload.age,
          cuisines: payload.chosenCuisines,
          diets: payload.chosenDiets,
          lifestyles: payload.chosenLifestyles,
          health: payload.chosenHealths,
          time: payload.chosenTimes

        }

        db.collection("Users")
          .doc(registeredUser.id)
          .set(...registeredUser)
          .catch(error => {
            console.log(error);
          })
          // .then(() => {
          //   dispatch("getUserData", user.uid);
          //   router.push("/").then(() => {
          //     Loading.hide();
          //     Notify.create({
          //       message: `New user created! Welcome ${user.displayName}`,
          //       type: "positive"
          //     });
          //   });
          // });
      });
      console.log("user registered and added to db", response);
    })
    .catch(function (error) {
      // Handle Errors here.

      console.log(error.code, error.message);
      Loading.hide();
      // ...
    })
}