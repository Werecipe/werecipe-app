import { db, auth, } from "boot/firebase";
import { Notify } from "quasar";
import Router from "../../router/index";

const state = {
  userDetail : {}

}
const mutations = {
  setUserDetails(state, payload) {
    state.userDetail = payload;
  }

}
const actions = {
  registerUser({ }, { data, pass }) {
    console.log("this is the data", data, pass)

    auth.createUserWithEmailAndPassword(data.email, pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.uid)
    db.collection("Users").doc(user.uid).set(data)
    // ...
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error.code, error.message)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
    // ..
  });
  },



  loginUser({ }, { email, pass }) {
    let user;
    auth.signInWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in
    user = userCredential.user;
    // ...
  }).then(() => {
      this.$router.push("/recipeSearch")
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
    auth.onAuthStateChanged(user => {
      if (user) {
        const user = auth.currentUser.uid;
        db.collection("Users").doc(user).onSnapshot(snapshot => {
                if (snapshot) {
                  userData = snapshot.data();
                  console.log(userData);
                  commit("setUserDetails", {
                    ...userData,
                    userId : user

                  })
                }; 
              });

      } else {
        commit("setUserDetails", { })
      }
    });
  },

  logoutUser() {
    auth.signOut();

  }


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