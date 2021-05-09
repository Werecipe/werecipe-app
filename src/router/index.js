import Quasar from 'quasar'
import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from "../store/auth/store"

import routes from './routes'
import Notify from 'Quasar'

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
  const logUserStatus = () => {
    const userStats = auth.state.userLoggedIn;
    return userStats
};

export default function ({ store, /*ssrContext  */ }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  // Router.beforeEach((to, from, next) => {
  //   if (to.matched.some(record => record.meta.requireAuth) && logUserStatus) {
  //     next({ path: '/requestLogin', query: { next: to.fullPath } })
  //   } else {
  //     next()
  //   }
  // })

  Router.beforeEach((to, from, next) => {
    console.log("navigation guard fired" )
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("the path requires authentication")
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!logUserStatus()) {
      console.log("navigation guard value", !logUserStatus())
   
      next({
        path: '/requestLogin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
 

//   Router.beforeEach((to,from, next) => {
//   to.matched.some( route =>{
//     if(route.meta.requiresAuth){
//       if(logUserStatus){
//         next({ path: '/requestLogin' })
//       }
//     }
//     next()
//   })
// })

  

  return Router
};
