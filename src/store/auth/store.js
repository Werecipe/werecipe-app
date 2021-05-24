import { db, FBauth, } from "boot/firebase";
import { Notify } from "quasar";
import Router from "../../router/index";


const state = {
  userDetails: {},
  userLoggedIn: false,
  userSavedRecipes: [],

}
const mutations = {
  setuserDetailss(state, payload) {
    state.userDetails = payload;
  },
  setUserLogStatus(state, payload) {
    state.userLoggedIn = payload;
    // console.log("store user status changed ", payload);
  },
  addRecipeList(state, payload) {
    state.userSavedRecipes = payload;

  }

}
const actions = {
  registerUser({}, { data, pass }) {

    FBauth.createUserWithEmailAndPassword(data.email, pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      db.collection("Users").doc(user.uid).set(data)
  })
  .then((response) => {
  })
  .catch((error) => {
    Notify.create(error.message);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    Notify.create(errorMessage);
  });
  },



  loginUser({ }, { email, pass }) {
    let user;
    FBauth.signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in
    user = userCredential.user;
    // ...
  }).then(() => {
    // commit("setUserLogStatus", true);
    // console.log("commit in login user", true);
      // this.$router.push('/recipeSearch')
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
      Notify.create(
              "username or password do not match, please try again"
            );

  });   
  },


  handleAuthStateChange({ commit }) {
    let userData = {};
    FBauth.onAuthStateChanged(user => {
      if (user) {
        const user = FBauth.currentUser.uid;
        commit("setUserLogStatus", true);
        // console.log("store user status fired ", true);
        db.collection("Users").doc(user).onSnapshot(snapshot => {
          if (snapshot) {
            userData = snapshot.data();
            commit("setuserDetailss", {
              ...userData,
              userId: user

            });
            this.$router.replace('/recipeSearch')
          };
        });

      } else {
        commit("setuserDetailss", {});
        commit("setUserLogStatus", false);
        // console.log("store user status fired ", false);
        this.$router.replace("/")

      }
    });
  },

  logoutUser() {
    FBauth.signOut();
  },


  updateUser({ state }, payload) {
    let user = state.userDetails.userId;
    console.log(user)
    
    db.collection("Users").doc(user).update(payload).then(() => {
    Notify.create("Account successfully updated");
})
    .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});


  },

  // --------recipe control ------------

  setRecipes({ }, payload) {

    const user = FBauth.currentUser.uid;
    db.collection("Users").doc(user).collection("savedRecipes").doc().set(payload)
    .then(() => {
    Notify.create("Recipe saved successfully")
    })
    .catch((error) => {
    Notify.create("Error writing document: ", error.message);
    })
  },


  getRecipeFromDb({commit }) {
    // console.log("store recipe fired")
    const user = FBauth.currentUser.uid;
    let recipeList = [];
    db.collection('Users').doc(user).collection("savedRecipes").onSnapshot(snapshot => {
      if (snapshot) {
        snapshot.forEach((doc) => {
          let recipe = doc.data();
          recipeList.push(recipe);
        });
        commit("addRecipeList", recipeList);
      }
    })
  },


}
const getters = {
  

}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}