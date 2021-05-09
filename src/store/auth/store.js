import { db, FBauth, } from "boot/firebase";
import { Notify } from "quasar";
import Router from "../../router/index";


const state = {
  userDetail: {},
  userLoggedIn: false,

}
const mutations = {
  setUserDetails(state, payload) {
    state.userDetail = payload;
  },
  setUserLogStatus(state, payload) {
    state.userLoggedIn = payload;
    console.log("store user status changed ", payload);
  }

}
const actions = {
  registerUser({}, { data, pass }) {
    // console.log("this is the data", data, pass)

    FBauth.createUserWithEmailAndPassword(data.email, pass)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      db.collection("Users").doc(user.uid).set(data)
      
    // ...
  })
  .then((response) => {
    // console.log(response)
  })
  .catch((error) => {
    // console.log(error.code, error.message)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // console.log(errorCode, errorMessage)
    // ..
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
        console.log("store user status fired ", true);
        db.collection("Users").doc(user).onSnapshot(snapshot => {
          if (snapshot) {
            userData = snapshot.data();
            commit("setUserDetails", {
              ...userData,
              userId: user

            });
            this.$router.push('/recipeSearch')
          };
        });

      } else {
        commit("setUserDetails", {});
        commit("setUserLogStatus", false);
        console.log("store user status fired ", false);
        this.$router.replace("/")

      }
    });
  },

  logoutUser() {
    FBauth.signOut();
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